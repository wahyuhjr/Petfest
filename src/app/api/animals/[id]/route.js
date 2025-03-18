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

export async function GET(request, { params }) {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!animal) {
      return NextResponse.json(
        { message: 'Animal not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(animal);
  } catch (error) {
    console.error('Error fetching animal:', error);
    return NextResponse.json(
      { message: 'Failed to fetch animal', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    
    if (!name) {
      return NextResponse.json(
        { message: 'Animal name is required' },
        { status: 400 }
      );
    }
    
    // Get current animal data to check if we need to update the image
    const currentAnimal = await prisma.animal.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!currentAnimal) {
      return NextResponse.json(
        { message: 'Animal not found' },
        { status: 404 }
      );
    }
    
    // Default to current image URL
    let imageUrl = currentAnimal.imageUrl;
    
    // Handle image upload if a new image was provided
    const image = formData.get('image');
    if (image && image.size > 0) {
      // Generate unique filename with png extension
      const fileName = `${uuidv4()}.png`;
      
      // Ensure upload directory exists
      const uploadDir = await ensureUploadDir();
      
      // Path where the file will be saved
      const filePath = path.join(uploadDir, fileName);
      
      // Convert file to buffer
      const buffer = Buffer.from(await image.arrayBuffer());
      
      // Write file to disk
      await writeFile(filePath, buffer);
      
      // Update image URL
      imageUrl = `/uploads/${fileName}`;
    }
    
    // Update animal in database
    const updatedAnimal = await prisma.animal.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        imageUrl
      }
    });
    
    return NextResponse.json(updatedAnimal);
  } catch (error) {
    console.error('Error updating animal:', error);
    return NextResponse.json(
      { message: 'Failed to update animal', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.animal.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    return NextResponse.json(
      { message: 'Failed to delete animal', error: error.message },
      { status: 500 }
    );
  }
}