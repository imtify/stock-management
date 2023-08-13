import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://imtiaz:Imti1234@cluster1.4cyxlky.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("inventory");
    const products = database.collection("products");
    const query = {};
    const product = await products.find(query).toArray();
    return NextResponse.json({ product });
  } finally {
    await client.close();
  }
}
