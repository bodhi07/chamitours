import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Blog } from "@/models";

export async function GET() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const blog = await Blog.create(data);
        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
