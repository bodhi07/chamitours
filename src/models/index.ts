import mongoose, { Schema, model, models } from "mongoose";

// --- Tour Model ---
const TourSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String },
    location: { type: String },
    duration: { type: String },
}, { timestamps: true });

export const Tour = models.Tour || model("Tour", TourSchema);

// --- Package Model ---
const PackageSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String },
    includes: [{ type: String }],
}, { timestamps: true });

export const Package = models.Package || model("Package", PackageSchema);

// --- Gallery Model ---
const GallerySchema = new Schema({
    title: { type: String },
    image: { type: String, required: true },
    category: { type: String },
    driveId: { type: String },
}, { timestamps: true });

export const Gallery = models.Gallery || model("Gallery", GallerySchema);

// --- Blog Model ---
const BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    excerpt: { type: String },
    author: { type: String, default: "ChamiTours" },
}, { timestamps: true });

export const Blog = models.Blog || model("Blog", BlogSchema);

// --- Booking Model ---
const BookingSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    tour: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: "Pending" },
}, { timestamps: true });

export const Booking = models.Booking || model("Booking", BookingSchema);
