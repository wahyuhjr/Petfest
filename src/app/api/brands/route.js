import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

const prisma = new PrismaClient();

// Ensure upload directory exists
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public/uploads/brands');
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
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { message: 'Failed to fetch brands', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const websiteUrl = formData.get('websiteUrl');
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { message: 'Brand name is required' },
        { status: 400 }
      );
    }
    
    let logoUrl = null;
    
    // Handle logo upload
    const logo = formData.get('logo');
    if (logo) {
      // Get file extension
      const fileExtension = '.png';
      
      // Generate unique filename
      const fileName = `brand-${uuidv4()}${fileExtension}`;
      
      // Ensure upload directory exists
      const uploadDir = await ensureUploadDir();
      
      // Path where the file will be saved
      const filePath = path.join(uploadDir, fileName);
      
      // Convert file to buffer
      const buffer = Buffer.from(await logo.arrayBuffer());
      
      // Write file to disk
      await writeFile(filePath, buffer);
      
      // Public URL for the file
      logoUrl = `/uploads/brands/${fileName}`;
    }
    
    // Create brand in database
    const brand = await prisma.brand.create({
      data: {
        name,
        websiteUrl: websiteUrl || null,
        logoUrl
      }
    });
    
    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { message: 'Failed to create brand', error: error.message },
      { status: 500 }
    );
  }
}