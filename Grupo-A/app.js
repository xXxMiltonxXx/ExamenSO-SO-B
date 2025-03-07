<<<<<<< HEAD
// Grupo # 5
// Bryan Velez ALvarez
// Jostin Moreira Zambrano
// Ronny Pilay Anchundia
// Gabriel Alonzo Alonzo
// David Mendoza Castillo
=======
// Grupo #
// Milton Angamarca

//Grupo 3
//Alava GResely Taylor
//Chavez Zambrano Aisha
//Delgado MEza Neysser
//Holguin Chavez leo

>>>>>>> dbcce460b921d78065909d9a9d92594159adb07f
const express = require("express");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log("Connected successfully to MongoDB");
  const db = client.db("inventory");
  const collection = db.collection("items");

  // Mostrar todos los productos
  app.get("/items", async (req, res) => {
    const items = await collection.find({}).toArray();
    res.send(items);
  });

  // Añadir un producto
  app.post("/addItem", async (req, res) => {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }
    await collection.insertOne({ name, category, price, quantity });
    res.send({ success: true });
  });

  // Actualizar información de un producto
  app.put("/updateItem", async (req, res) => {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }
    await collection.updateOne(
      { name },
      { $set: { category, price, quantity } }
    );
    res.send({ success: true });
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

main().catch(console.error);
