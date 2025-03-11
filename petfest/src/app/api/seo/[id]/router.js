import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const seoEntry = await prisma.sEO.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!seoEntry) {
      return NextResponse.json(
        { success: false, message: 'SEO entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: seoEntry
    });
  } catch (error) {
    console.error('Error fetching SEO entry:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch SEO entry', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Update SEO entry
    const updatedSeoEntry = await prisma.sEO.update({
      where: { id: parseInt(id) },
      data
    });
    
    return NextResponse.json({
      success: true,
      data: updatedSeoEntry
    });
  } catch (error) {
    console.error('Error updating SEO entry:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to update SEO entry', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.sEO.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'SEO entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting SEO entry:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to delete SEO entry', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}