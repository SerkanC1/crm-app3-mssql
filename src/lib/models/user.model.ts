// src/lib/models/user.model.ts

import { BaseModel, ModelValidationError, ValidationError } from "./base.model";
import db from "../db";
import sql from "mssql";

/**
 * Kullanıcı arayüzü
 */
export interface IUser extends BaseModel {
  UserName: string;
  Password_: string;
  NameSurname?: string;
  CreateDate?: Date;
  LastActive?: Date;
  Admin_: boolean;
  Active: boolean;
  IsLogin?: boolean;
  LastLogout?: Date;
  OfferSalesColumns?: number;
  ItemsColumns?: number;
  OtherPackingsColumns?: number;
}

/**
 * Kullanıcı sınıfı
 */
export class User implements IUser {
  id: number = 0; // BaseModel'den gelen id property'si için başlangıç değeri
  UserName: string = ""; // başlangıç değeri eklendi
  Password_: string = ""; // başlangıç değeri eklendi
  NameSurname?: string;
  CreateDate?: Date;
  LastActive?: Date;
  Admin_: boolean = false; // başlangıç değeri eklendi
  Active: boolean = false; // başlangıç değeri eklendi
  IsLogin?: boolean;
  LastLogout?: Date;
  OfferSalesColumns?: number;
  ItemsColumns?: number;
  OtherPackingsColumns?: number;

  /**
   * Kullanıcı sınıfı constructor'ı
   */
  constructor(data: Partial<IUser>) {
    // Required fields için explicit kontrol
    this.UserName = data.UserName || "";
    this.Password_ = data.Password_ || "";
    this.Admin_ = data.Admin_ ?? false;
    this.Active = data.Active ?? false;

    // Diğer optional fieldlar için Object.assign
    Object.assign(this, data);
  }

  /**
   * Model doğrulaması yapar
   */
  validate(): boolean {
    const errors: ModelValidationError[] = [];

    if (!this.UserName) {
      errors.push({ field: "UserName", message: "Username is required" });
    }
    if (!this.Password_) {
      errors.push({ field: "Password_", message: "Password is required" });
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    return true;
  }

  /**
   * Tüm kullanıcıları getirir
   */
  static async findAll(): Promise<User[]> {
    const pool = await db.getPool();
    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset.map((record) => new User(record));
  }

  /**
   * ID'ye göre kullanıcı getirir
   */
  static async findById(id: number): Promise<User | null> {
    const pool = await db.getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE ID = @id");

    return result.recordset[0] ? new User(result.recordset[0]) : null;
  }

  /**
   * Yeni kullanıcı oluşturur
   */
  async create(): Promise<User> {
    this.validate();

    return await db.executeWithTransaction(async (transaction) => {
      const result = await transaction
        .request()
        .input("UserName", sql.VarChar(20), this.UserName)
        .input("Password_", sql.VarChar(20), this.Password_)
        .input("NameSurname", sql.VarChar(50), this.NameSurname)
        .input("CreateDate", sql.DateTime, this.CreateDate || new Date())
        .input("Admin_", sql.Bit, this.Admin_)
        .input("Active", sql.Bit, this.Active).query(`
          INSERT INTO Users (
            UserName, Password_, NameSurname, CreateDate, 
            Admin_, Active
          ) 
          OUTPUT INSERTED.* 
          VALUES (
            @UserName, @Password_, @NameSurname, @CreateDate,
            @Admin_, @Active
          )
        `);

      return new User(result.recordset[0]);
    });
  }

  /**
   * Kullanıcı bilgilerini günceller
   */
  async update(): Promise<User> {
    this.validate();

    return await db.executeWithTransaction(async (transaction) => {
      const result = await transaction
        .request()
        .input("id", sql.Int, this.id)
        .input("UserName", sql.VarChar(20), this.UserName)
        .input("Password_", sql.VarChar(20), this.Password_)
        .input("NameSurname", sql.VarChar(50), this.NameSurname)
        .input("LastActive", sql.DateTime, this.LastActive)
        .input("Admin_", sql.Bit, this.Admin_)
        .input("Active", sql.Bit, this.Active).query(`
          UPDATE Users 
          SET UserName = @UserName,
              Password_ = @Password_,
              NameSurname = @NameSurname,
              LastActive = @LastActive,
              Admin_ = @Admin_,
              Active = @Active
          OUTPUT INSERTED.*
          WHERE ID = @id
        `);

      return new User(result.recordset[0]);
    });
  }

  /**
   * Kullanıcıyı siler
   */
  async delete(): Promise<boolean> {
    return await db.executeWithTransaction(async (transaction) => {
      const result = await transaction
        .request()
        .input("id", sql.Int, this.id)
        .query("DELETE FROM Users WHERE ID = @id");

      return result.rowsAffected[0] > 0;
    });
  }
}
