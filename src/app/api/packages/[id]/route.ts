import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Package } from "@/models";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const pkg = await Package.findById(params.id);
        if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 });
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const pkg = await Package.findByIdAndUpdate(params.id, data, { new: true });
        if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 });
        return NextResponse.json(pkg);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const pkg = await Package.findByIdAndDelete(params.id);
        if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 });
        return NextResponse.json({ message: "Package deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
    }
}
