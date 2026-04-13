import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Blog } from "@/models";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const blog = await Blog.findById(params.id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const blog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const blog = await Blog.findByIdAndDelete(params.id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
