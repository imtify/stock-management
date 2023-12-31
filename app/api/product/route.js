import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://imtiaz:Imti1234@cluster1.4cyxlky.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("inventory");
    const collection = database.collection("products");
    const query = {};
    const products = await collection.find(query).toArray();
    return NextResponse.json({ products });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const body = await request.json();
  const uri = "mongodb+srv://imtiaz:Imti1234@cluster1.4cyxlky.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("inventory");
    const products = database.collection("products");
    const query = {};
    const product = await products.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } finally {
    await client.close();
  }
}
