import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectToDatabase, {prisma} from "@/prisma";

export async function POST(request : Request) {
    const { name, email, password, confirmPassword } = await request.json();
    const isValidEmail = (email : string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }
    if(!name || !email || !password || !confirmPassword) {
        return NextResponse.json({message : " All fields are required"}, {status : 400});
    }
    if(!isValidEmail(email)) {
        return NextResponse.json({message : "Invalid email address"}, {status : 400});
    }
    if(password !== confirmPassword) {
        return NextResponse.json({message : "Passwords do not match"}, {status : 400});
    }
    if(password.length < 6) {
        return NextResponse.json({message : "Password must be at least 6 characters long"}, {status : 400});
    }
    try{
        await connectToDatabase();
        const existingUser = await prisma.user.findUnique({where:{email}});
        if(existingUser) {
            return NextResponse.json({message : "User already exists"}, {status : 400});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data:{
            name,
            email,
            password : hashedPassword,
            },
        });
        return NextResponse.json({message : "User created successfully"}, {status : 201});
    }catch(error){
        return NextResponse.json({message : "Something went wrong"}, {status : 500});
    }
}