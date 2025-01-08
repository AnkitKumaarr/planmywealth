import mysql from "./db.config";

export async function executeQuery({ query, values = [] }) {
  try {
    const results = await mysql.query(query, values);
    await mysql.end();
    return results;
  } catch (error) {
    return { error };
  }
}

// Example query functions
export async function getUsers() {
  const query = "SELECT * FROM users";
  return executeQuery({ query });
}

export async function createUser({ name, email }) {
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  const values = [name, email];
  return executeQuery({ query, values });
}
