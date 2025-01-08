import mysql from "./db.config";
import bcrypt from "bcryptjs";

export async function initializeDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS pmw_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        verification_token VARCHAR(255),
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await mysql.query(createTableQuery);
    // await mysql.end();
    return { success: true };
  } catch (error) {
    console.error("Database initialization error:", error);
    return { error: error.message };
  }
}
