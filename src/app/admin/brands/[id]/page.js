import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    const data = await request.json();
    
    if (!data.name) {
      return NextResponse.json(
        { message: 'Brand name is required' },
        { status: 400 }
      );
    }
    
    const updatedBrand = await prisma.brand.update({
      where: { id: parseInt(params.id) },
      data: {
        name: data.name,
        logoUrl: data.logoUrl || null,
        websiteUrl: data.websiteUrl || null
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