import connectDB from "@/dbconfig/connectdb";
import User from "@/dbconfig/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    try {
        const { firstName, lastName, username, email, password, isAdmin } = reqBody;

        // Proper user existence check using $or
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            isAdmin,
            password // Change this to hashedPassword once bcryptjs is used
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
