// src/lib/db.js
import sql from 'mssql';

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

export async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to MSSQL');
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
}