import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Gallery } from "@/models";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const item = await Gallery.findByIdAndDelete(params.id);
        if (!item) return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
        return NextResponse.json({ message: "Gallery item deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
    }
}
