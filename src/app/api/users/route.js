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
    const isUser = await User.findOne({ email: userData.email });
    if (!isUser) {
      const user = await User.create(userData);
      const emailParams = {
        to: userData.email,
        subject: "Test Email",
        body: `<h1>testing email</h1>`,
      };
      if (user) {
        await sendEmail(emailParams);
        return NextResponse.json({
          status: 201,
          message:
            "Successfully created an account please check your email to verify your account",
          data: user,
        });
      }
    }
    if (isUser && !isUser.password) {
      const emailParams = {
        to: userData.email,
        subject: "Test Email",
        body: `<h1>testing email</h1>`,
      };
      await sendEmail(emailParams);
      return NextResponse.json({
        status: 200,
        message: "Welcome back! please check your email to verify your account",
        data: isUser,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "You have already registered please login",
      data: null,
    });
  } catch (err) {
    console.log(">>>>>>>>>>>..", err);
    return NextResponse.json(
      { message: "Error in signup user" },
      { status: 500 }
    );
  }
}

// this function will work for set/reset password also and update user
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    let where = {};
    for (const [key, value] of searchParams.entries()) {
      where[key] = value;
    }
    const updatedData = await request.json();
    await connectToDatabase();
    const user = await User.findOneAndUpdate(where, updatedData, {
      new: true,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "User Updated successfully",
      data: user,
    });
  } catch (err) {
    console.log(">>>>>>>>>>>..", err);
    return NextResponse.json(
      { message: "Error in updating user" },
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
    const user = await User.findByIdAndDelete(where);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.log(">>>>>>>>>>>..", err);
    return NextResponse.json(
      { message: "Error in deleting user" },
      { status: 500 }
    );
  }
}
