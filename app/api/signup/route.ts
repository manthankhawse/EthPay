import connectDB from "@/dbconfig/connectdb";
import User from "@/dbconfig/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    try {
        const { firstName, lastName, username, email, password, wallet, isAdmin } = reqBody;

        // Proper user existence check using $or
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt);

        let walletAddresses = [];
        walletAddresses.push(wallet);

        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            wallet,
            isAdmin,
            walletAddresses,
            password // Change this to hashedPassword once bcryptjs is used
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
