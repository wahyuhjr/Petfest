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

export async function GET(request, { params }) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!brand) {
      return NextResponse.json(
        { message: 'Brand not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    return NextResponse.json(
      { message: 'Failed to fetch brand', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const websiteUrl = formData.get('websiteUrl');
    
    if (!name) {
      return NextResponse.json(
        { message: 'Brand name is required' },
        { status: 400 }
      );
    }
    
    // Get current brand data to check if we need to update the logo
    const currentBrand = await prisma.brand.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!currentBrand) {
      return NextResponse.json(
        { message: 'Brand not found' },
        { status: 404 }
      );
    }
    
    // Default to current logo URL
    let logoUrl = currentBrand.logoUrl;
    
    // Handle logo upload if a new logo was provided
    const logo = formData.get('logo');
    if (logo && logo.size > 0) {
      // Generate unique filename with png extension
      const fileName = `brand-${uuidv4()}.png`;
      
      // Ensure upload directory exists
      const uploadDir = await ensureUploadDir();
      
      // Path where the file will be saved
      const filePath = path.join(uploadDir, fileName);
      
      // Convert file to buffer
      const buffer = Buffer.from(await logo.arrayBuffer());
      
      // Write file to disk
      await writeFile(filePath, buffer);
      
      // Update logo URL
      logoUrl = `/uploads/brands/${fileName}`;
    }
    
    // Update brand in database
    const updatedBrand = await prisma.brand.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        websiteUrl: websiteUrl || null,
        logoUrl
      }
    });
    
    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json(
      { message: 'Failed to update brand', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.brand.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json(
      { message: 'Failed to delete brand', error: error.message },
      { status: 500 }
    );
  }
}