import express from "express";
import { init, findAll, create } from "./conector.js";
import { v4 as uuid } from "uuid";

const app = express();

app.use(express.json());

app.get("/libros", async (req, res) => {
  try {
    const libros = await findAll();
    res.json(libros);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/libros", async (req, res) => {
  try {
    const { title, author } = req.body;
    const data = await create({ id: uuid(), title, author });
    if (data) {
      return res.status(201).json(data);
    }
    return res.status(400).json({ error: "Error al crear" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

init()
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
