import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Tour } from "@/models";

export async function GET() {
    try {
        await connectToDatabase();
        const tours = await Tour.find({}).sort({ createdAt: -1 });
        return NextResponse.json(tours);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const tour = await Tour.create(data);
        return NextResponse.json(tour, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create tour" }, { status: 500 });
    }
}
