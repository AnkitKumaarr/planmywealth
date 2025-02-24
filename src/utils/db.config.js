import mysql from "mysql2/promise";

let pool;

const createPool = async () => {
  pool = mysql.createPool({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
};

const getPool = async () => {
  if (!pool || pool._closed) {
    pool = await createPool();
  }
  return pool;
};

export const checkDatabaseConnection = async () => {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};

const mysql_pool = {
  query: async (...args) => {
    const pool = await getPool();
    return pool.query(...args);
  },
  getConnection: async () => {
    const pool = await getPool();
    return pool.getConnection();
  },
  createPool: createPool,
  pool: pool,
};

export default mysql_pool;
