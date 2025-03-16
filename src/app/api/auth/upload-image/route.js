import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";
import mysql from "@/utils/db.config";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    // Authenticate the request
    const authResponse = await authenticate(request);

    if (typeof authResponse !== "string") {
      return authResponse; // Return the error response if authentication fails
    }

    const userEmail = authResponse;
    
    // Process the form data
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Get file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const fileName = `${uuidv4()}_${file.name.replace(/\s/g, "_")}`;
    const publicDir = path.join(process.cwd(), "public");
    const uploadDir = path.join(publicDir, "uploads");
    const filePath = path.join(uploadDir, fileName);
    
    // Ensure upload directory exists
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error("File write error:", error);
      return NextResponse.json(
        { error: "Failed to save image" },
        { status: 500 }
      );
    }
    
    // Save the image path to the user's profile
    const imageUrl = `/uploads/${fileName}`;
    const [result] = await mysql.query(
      "UPDATE pmw_users SET profile_image = ? WHERE email = ?",
      [imageUrl, userEmail]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Failed to update profile image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile image uploaded successfully",
      imageUrl
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
} 