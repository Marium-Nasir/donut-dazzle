import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/config/db.connection";
import Area from "../../../../models/areaSchema";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      if (key === "deliveryCharges") {
        // Parse and handle deliveryCharges as a number
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          where[key] = numValue;
        } else {
          return NextResponse.json(
            { message: "Invalid deliveryCharges value" },
            { status: 400 }
          );
        }
      } else {
        // Apply regex for string fields
        where[key] = { $regex: value, $options: "i" };
      }
    }

    await connectToDatabase();
    const areas = await Area.find(where);

    if (!areas || !areas.length) {
      return NextResponse.json({ message: "Areas not found" }, { status: 404 });
    }
    return NextResponse.json({
      status: 200,
      message: "Areas Fetched",
      data: areas,
    });
  } catch (err) {
    console.log(">>>>>>>>>>>..", err);

    return NextResponse.json(
      { message: "Error in fetching Areas" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    const area = await Area.create(data);
    return NextResponse.json({
      status: 201,
      message: "Area Added",
      data: area,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error in adding areas" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      where[key] = value;
    }
    const updatedData = await request.json();

    await connectToDatabase();
    const Areas = await Area.findByIdAndUpdate(where, updatedData, {
      new: true,
    });

    if (!Areas) {
      return NextResponse.json({ message: "Area not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "Area Updated successfully",
      data: Areas,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error in fetching Areas" },
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
    const Areas = await Area.findByIdAndDelete(where);

    if (!Areas) {
      return NextResponse.json({ message: "Area not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Area deleted successfully" },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error in fetching Areas" },
      { status: 500 }
    );
  }
}
