import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Booking } from "@/models";

export async function GET() {
    try {
        await connectToDatabase();
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const booking = await Booking.create(data);
        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
