// src/lib/db.ts

import sql, { ConnectionPool, Transaction } from "mssql";

interface DatabaseConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
    enableArithAbort: boolean;
  };
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
}

class Database {
  private static instance: Database;
  private pool: ConnectionPool | null = null;

  private config: DatabaseConfig = {
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    server: process.env.DATABASE_SERVER!,
    database: process.env.DATABASE_NAME!,
    options: {
      encrypt: true,
      trustServerCertificate: true,
      enableArithAbort: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  private constructor() {
    // Environment variables kontrolü
    if (
      !process.env.DATABASE_USER ||
      !process.env.DATABASE_PASSWORD ||
      !process.env.DATABASE_SERVER ||
      !process.env.DATABASE_NAME
    ) {
      throw new Error("Database configuration is missing");
    }
  }

  /**
   * Singleton pattern ile database instance'ı oluşturur
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Bağlantı havuzunu başlatır veya mevcut havuzu döndürür
   */
  public async getPool(): Promise<ConnectionPool> {
    if (!this.pool) {
      try {
        this.pool = await new ConnectionPool(this.config).connect();
        console.log("Database pool created");

        // Pool error handling
        this.pool.on("error", (err) => {
          console.error("Database pool error:", err);
          this.pool = null;
        });
      } catch (error) {
        console.error("Failed to create database pool:", error);
        throw error;
      }
    }
    return this.pool;
  }

  /**
   * Bağlantıyı test eder
   */
  public async testConnection(): Promise<boolean> {
    try {
      const pool = await this.getPool();
      await pool.request().query("SELECT 1");
      return true;
    } catch (error) {
      console.error("Database connection test failed:", error);
      return false;
    }
  }

  /**
   * Transaction ile sorgu çalıştırır
   */
  public async executeWithTransaction<T>(
    callback: (transaction: Transaction) => Promise<T>
  ): Promise<T> {
    const pool = await this.getPool();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Normal sorgu çalıştırır (transaction olmadan)
   */
  public async executeQuery<T>(query: string, params?: unknown[]): Promise<T> {
    const pool = await this.getPool();
    const request = pool.request();

    if (params) {
      params.forEach((param, index) => {
        request.input(`param${index}`, param);
      });
    }

    try {
      const result = await request.query(query);
      return result.recordset as unknown as T;
    } catch (error) {
      console.error("Query execution failed:", error);
      throw error;
    }
  }

  /**
   * Havuzu kapatır
   */
  public async closePool(): Promise<void> {
    if (this.pool) {
      try {
        await this.pool.close();
        this.pool = null;
        console.log("Database pool closed");
      } catch (error) {
        console.error("Failed to close database pool:", error);
        throw error;
      }
    }
  }
}

export default Database.getInstance();
