import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/config/db.connection";
import User from "../../../../../models/userSchema";
import { generateToken } from "@/lib/helpers/JWTService";

export async function POST(request) {
  try {
    const userData = await request.json();
    await connectToDatabase();
    const user = await User.findOne({ email: userData.email });
    if (user && (await user.matchPassword(userData.password))) {
      const token = await generateToken(user._id, "604800s");
      console.log(`>>>>>>>token>>>>>>>>>>`, token);
      return NextResponse.json({
        status: 200,
        message: "LoggedIn Successfully",
        data: { user, token: token },
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Invalid Credentials",
      data: null,
    });
  } catch (err) {
    console.log(`>>>>>>>>>>>.error while login`, err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
