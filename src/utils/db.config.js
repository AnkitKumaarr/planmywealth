import mysql from "mysql2/promise";

const connectionConfig = {
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
};

export async function checkDatabaseConnection() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.ping(); // Check if the connection is alive
    console.log("Database connection successful");
    await connection.end();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

export default mysql.createPool(connectionConfig);
