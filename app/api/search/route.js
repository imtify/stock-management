import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const uri = "mongodb+srv://imtiaz:Imti1234@cluster1.4cyxlky.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("inventory");
    const collection = database.collection("products");
    const products = await collection
      .aggregate([
        {
          $match: {
            $or: [{ slug: { $regex: query, $options: "i" } }],
          },
        },
      ])
      .toArray();
    return NextResponse.json({ products });
  } finally {
    await client.close();
  }
}
