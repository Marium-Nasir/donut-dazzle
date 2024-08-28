import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/config/db.connection";
import User from "../../../../models/userSchema";
import { sendEmail } from "@/lib/helpers/sendEmail";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      // where[key] = value;
      where[key] = { $regex: value, $options: "i" };
    }

    await connectToDatabase();
    const users = await User.find(where);
    if (!users || !User.length) {
      return NextResponse.json({ message: "Users not found" }, { status: 404 });
    }
    return NextResponse.json({
      status: 200,
      message: "Users Fetched",
      data: users,
    });
  } catch (err) {
    console.log(">>>>>>>>>>>..", err);

    return NextResponse.json(
      { message: "Error in fetching Users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    await connectToDatabase();
    const user = await User.create(userData);
    const emailParams = {
      to: userData.email,
      subject: "Test Email",
      body: `<h1>testing email</h1>`,
    };
    // if (user.length) {
    const test = await sendEmail(emailParams);
    console.log(test + `MTMEEEEEEEEEEEEEEEEEEEEEEEEE`);

    // }
    return NextResponse.json({
      status: 201,
      message:
        "Successfully created an account please check your email to verify your account",
      data: user,
    });
  } catch (err) {
    console.log(">>>>>>>>>>>..", err);

    return NextResponse.json(
      { message: "Error in signup user" },
      { status: 500 }
    );
  }
}
