import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const animalId = parseInt(id);
    
    if (isNaN(animalId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid animal ID' },
        { status: 400 }
      );
    }
    
    // Find the animal first to check if it exists
    const animal = await prisma.animal.findUnique({
      where: { id: animalId }
    });
    
    if (!animal) {
      return NextResponse.json(
        { success: false, message: 'Animal not found' },
        { status: 404 }
      );
    }
    
    // Increment the clickCount
    const updatedAnimal = await prisma.animal.update({
      where: { id: animalId },
      data: {
        clickCount: {
          increment: 1
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedAnimal
    });
  } catch (error) {
    console.error('Error incrementing click count:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to increment click count', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}