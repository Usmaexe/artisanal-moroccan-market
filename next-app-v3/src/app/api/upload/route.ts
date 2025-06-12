import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const imagePath = formData.get('path') as string;
    
    if (!image || !imagePath) {
      return NextResponse.json(
        { error: 'Image or path is missing' },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await image.arrayBuffer());
    
    // Create the full path where the image will be saved
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Write the file to the specified path
    await writeFile(fullPath, buffer);
    
    return NextResponse.json({ success: true, path: imagePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}