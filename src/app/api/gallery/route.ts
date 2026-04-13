import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Gallery } from "@/models";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const item = await Gallery.create(data);
        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
    }
}
