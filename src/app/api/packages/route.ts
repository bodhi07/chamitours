import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Package } from "@/models";

export async function GET() {
    try {
        await connectToDatabase();
        const packages = await Package.find({}).sort({ createdAt: -1 });
        return NextResponse.json(packages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const pkg = await Package.create(data);
        return NextResponse.json(pkg, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
    }
}
