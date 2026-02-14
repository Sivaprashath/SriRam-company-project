import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'wardrobe-manager';

let client = null;
let db = null;

export async function connect() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`MongoDB connected: ${DB_NAME}`);
  return db;
}

export function getDb() {
  if (!db) throw new Error('MongoDB not connected. Call connect() first.');
  return db;
}

export async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
