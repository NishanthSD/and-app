const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://nishanthsdedu:sdganish@cluster0.yhrsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let client;

async function connectToDb() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  }
  return client.db('test');
}

module.exports = { connectToDb };
