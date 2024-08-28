const express = require('express');
const { connectToDb } = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

// GET route
app.get('/items', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection('test');
    const items = await collection.find({}).toArray();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving items');
  }
});

// POST route
app.post('/items', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection('test');
    const newItem = req.body;
    const result = await collection.insertOne(newItem);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting item');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
