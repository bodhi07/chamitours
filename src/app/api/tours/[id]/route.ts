import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Tour } from "@/models";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const tour = await Tour.findById(params.id);
        if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
        return NextResponse.json(tour);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tour" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const tour = await Tour.findByIdAndUpdate(params.id, data, { new: true });
        if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
        return NextResponse.json(tour);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update tour" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const tour = await Tour.findByIdAndDelete(params.id);
        if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
        return NextResponse.json({ message: "Tour deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 });
    }
}
