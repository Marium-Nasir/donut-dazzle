import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/config/db.connection";
import Product from "../../../../../models/productSchema";

export async function GET(request, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = params;
  const updatedData = await request.json();

  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 }
    );
  }
}
