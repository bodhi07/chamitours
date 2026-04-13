import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Gallery } from "@/models";
import { uploadToDrive } from "@/lib/googleDrive";

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
        
        const contentType = request.headers.get("content-type");
        
        if (contentType?.includes("multipart/form-data")) {
            const formData = await request.formData();
            const file = formData.get("file") as File;
            const category = formData.get("category") as string;
            const title = formData.get("title") as string;

            if (!file) {
                return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
            }

            // Upload to Google Drive (Folder ID from user)
            const folderId = "1vWo7aKV9xey_CGvkpOmMlT8Fr3sJZ1rl";
            const driveFile = await uploadToDrive(file, folderId);

            // Google Drive direct link hack (using file ID)
            const directLink = `https://lh3.googleusercontent.com/u/0/d/${driveFile.id}`;
            // OR use the actual drive link (but sometimes it doesn't embed well)
            // For gallery, we often use a formatted link
            const embedLink = `https://drive.google.com/thumbnail?id=${driveFile.id}&sz=w1000`;

            const item = await Gallery.create({
                title: title || file.name,
                image: embedLink, // Using thumbnail link for better performance/embedding
                category: category || "General",
                driveId: driveFile.id,
            });

            return NextResponse.json(item, { status: 201 });
        } else {
            // Fallback to JSON for direct links
            const data = await request.json();
            const item = await Gallery.create(data);
            return NextResponse.json(item, { status: 201 });
        }
    } catch (error: any) {
        console.error("GALLERY_UPLOAD_ERROR_STACK:", error);
        return NextResponse.json({ 
            error: "Failed to create gallery item", 
            details: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        }, { status: 500 });
    }
}
