import connectDB from "@/dbconfig/connectdb";
import User from "@/dbconfig/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    try {
        const { username, password } = reqBody;

        // Proper user existence check using $or
        const user = await User.findOne({ username });

        if (!user || user.password!==password || !user.isAdmin) {
            return NextResponse.json({ message: "User Not Found or incorrect password" }, { status: 400 });
        }

        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt);
        

        return NextResponse.json({
            message: "User logged in successfully",
            success: true,
            user
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
