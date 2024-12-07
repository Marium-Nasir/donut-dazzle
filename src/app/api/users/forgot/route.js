import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/config/db.connection";
import User from "../../../../../models/userSchema";
import { generateToken } from "@/lib/helpers/JWTService";
import { sendEmail } from "@/lib/helpers/sendEmail";

// it will hit when user clicks forgot password and sends email to user
export async function POST(request) {
  try {
    const userData = await request.json();
    await connectToDatabase();
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "Email Not Exists",
        data: null,
      });
    }
    const token = await generateToken(user._id, "7200s");
    const link = `http://localhost:3000/api/users/verify?token=${token}`;
    const emailParams = {
      to: user.email,
      subject: "Reset Password",
      body: `<p>click this link to reset your password ${link}</p>`,
    };
    await sendEmail(emailParams);
    return NextResponse.json({
      status: 200,
      message: "Email Sent Please check your inbox for further process",
      data: null,
    });
  } catch (err) {
    console.log(`>>>>>>>>>>>.error in forgot api`, err);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
