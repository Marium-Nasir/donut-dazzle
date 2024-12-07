import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/helpers/JWTService";

// this API will verify the link
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }
    console.log("Token received:", token);
    const verified = await verifyToken(token);
    if (verified === "invalid token") {
      return NextResponse.json({ message: "Invalid Link" }, { status: 401 });
    } else if (verified === "jwt expired") {
      return NextResponse.json(
        { message: "Link has expired" },
        { status: 403 }
      );
    }
    return NextResponse.json({
      status: 200,
      message: "Verified Successfully",
      data: verified,
    });
  } catch (err) {
    console.log(`>>>>>>>>>>error in verifying>>>>>>>>>>`, err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
