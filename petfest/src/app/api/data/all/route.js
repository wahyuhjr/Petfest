import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch both animals and brands in parallel
    const [animals, brands] = await Promise.all([
      prisma.animal.findMany({
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.brand.findMany({
        orderBy: {
          name: 'asc'
        }
      })
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        animals,
        brands
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch data', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}