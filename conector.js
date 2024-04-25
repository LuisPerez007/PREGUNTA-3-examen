import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

dotenv.config();
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "postgres";
const database = process.env.DB_DATABASE || "libros";
const password = process.env.DB_PASSWORD || "123";
const port = process.env.DB_PORT || 5432;
let client;

const { Client } = pkg;
export async function init() {
  client = new Client({
    host,
    port,
    database,
    user,
    password,
  });

  return client
    .connect()
    .then(async () => {
      console.log(`Connected to postgres db at host ${host}`);
      // Run the SQL instruction to create the table if it does not exist
      await client.query(
        "CREATE TABLE IF NOT EXISTS libros (id varchar(50), title varchar(255), author varchar(255))"
      );
      console.log(
        "Connected to db and created table libros if it did not exist"
      );
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

export async function findAll() {
  return client
    .query("SELECT * FROM libros")
    .then((res) => {
      return res.rows.map((row) => ({
        id: row.id,
        title: row.title,
        author: row.author,
      }));
    })
    .catch((err) => {
      console.error("Unable to get items:", err);
    });
}

export async function create(item) {
  return client
    .query("INSERT INTO libros(id, title, author) VALUES($1, $2, $3)", [
      item.id,
      item.title,
      item.author,
    ])
    .then(() => {
      return item;
    })
    .catch((err) => {
      console.error("Unable to store item:", err);
    });
}
