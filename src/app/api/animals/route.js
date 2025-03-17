import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

const prisma = new PrismaClient();

// Ensure upload directory exists
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  try {
    await mkdir(uploadDir, { recursive: true });
    return uploadDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const animals = await prisma.animal.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json(animals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    return NextResponse.json(
      { message: 'Failed to fetch animals', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { message: 'Animal name is required' },
        { status: 400 }
      );
    }
    
    let imageUrl = null;
    
    // Handle image upload
    const image = formData.get('image');
    if (image) {
      // Get file extension
      const fileExtension = '.png';
      
      // Generate unique filename
      const fileName = `${uuidv4()}${fileExtension}`;
      
      // Ensure upload directory exists
      const uploadDir = await ensureUploadDir();
      
      // Path where the file will be saved
      const filePath = path.join(uploadDir, fileName);
      
      // Convert file to buffer
      const buffer = Buffer.from(await image.arrayBuffer());
      
      // Write file to disk
      await writeFile(filePath, buffer);
      
      // Public URL for the file
      imageUrl = `/uploads/${fileName}`;
    }
    
    // Create animal in database
    const animal = await prisma.animal.create({
      data: {
        name,
        imageUrl,
        clickCount: 0
      }
    });
    
    return NextResponse.json(animal, { status: 201 });
  } catch (error) {
    console.error('Error creating animal:', error);
    return NextResponse.json(
      { message: 'Failed to create animal', error: error.message },
      { status: 500 }
    );
  }
}