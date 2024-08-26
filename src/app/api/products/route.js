import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/config/db.connection";
import Product from "../../../../models/productSchema";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      // where[key] = value;
      where[key] = { $regex: value, $options: "i" };
    }

    await connectToDatabase();
    const products = await Product.find(where);
    if (!products || !products.length) {
      return NextResponse.json(
        { message: "Products not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      status: 200,
      message: "Products Fetched",
      data: products,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error in fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Handle form data
    const formData = await request.formData();
    let formDataEntries = {};
    let filePath = null;

    // Iterate over formData entries
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Handle file
        const buffer = Buffer.from(await value.arrayBuffer());
        const filename = value.name.replaceAll(" ", "_"); // Handle spaces in filenames

        // Ensure the uploads directory exists
        const uploadDir = path.join(process.cwd(), "uploads");
        await fs.promises.mkdir(uploadDir, { recursive: true }); // Create the directory if it doesn't exist

        // Write the file to the uploads directory
        filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);
      } else {
        // Handle form fields
        formDataEntries[key] = value;
      }
    }

    // Combine form data entries and file path
    const productData = {
      ...formDataEntries,
      productImage: filePath, // Add file path to the product data
    };

    await connectToDatabase();
    // Save the product to the database
    const product = await Product.create(productData);
    return NextResponse.json({
      status: 201,
      message: "Product Created",
      data: product,
    });
  } catch (err) {
    console.error("Error occurred while creating product:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      where[key] = value;
    }
    await connectToDatabase();
    const updatedData = await request.json();

    const product = await Product.findByIdAndUpdate(where, updatedData, {
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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      where[key] = value;
    }
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(where);

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
