import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/config/db.connection";
import Product from "../../../../models/productSchema";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find({});
  return NextResponse.json(products, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  await connectToDatabase();
  const productData = await request.json();
  const product = new Product(productData);
  await product.save();
  return NextResponse.json(product, {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
