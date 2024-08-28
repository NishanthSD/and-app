const express = require('express');
const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://nishanthsdedu:sdganish@cluster0.yhrsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'test';
const collectionName = 'test';

const app = express();
const port = 3000;

app.use(express.json());

let client;
let db;

// Connect to MongoDB
async function connectToDb() {
  if (!client) {
    client = new MongoClient(uri); // Deprecated options removed
    try {
      await client.connect();
      db = client.db(dbName);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  }
  return db;
}

// Close MongoDB connection
async function closeConnection() {
  if (client) {
    try {
      await client.close();
      client = null;
      db = null;
      console.log('MongoDB connection closed');
    } catch (err) {
      console.error('Failed to close MongoDB connection', err);
    }
  }
}

// GET route
app.get('/items', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection(collectionName);
    const items = await collection.find({}).toArray();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error retrieving items:', err);
    res.status(500).send('Error retrieving items');
  } finally {
    await closeConnection();
  }
});

// POST route
app.post('/items', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection(collectionName);
    const newItem = req.body;
    const result = await collection.insertOne(newItem);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    console.error('Error inserting item:', err);
    res.status(500).send('Error inserting item');
  } finally {
    await closeConnection();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
