// src/app/api/data/all/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch animals, brands, and SEO data in parallel
    const [animals, brands, seoEntries] = await Promise.all([
      prisma.animal.findMany({
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.brand.findMany({
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.sEO.findMany() // Get all SEO entries
    ]);
    
    // Organize SEO data by page type for easier frontend usage
    const seo = {
      global: seoEntries.find(entry => entry.pageType === 'global') || null,
      home: seoEntries.find(entry => entry.pageType === 'home') || null,
      animals: seoEntries.filter(entry => entry.pageType === 'animal'),
      brands: seoEntries.filter(entry => entry.pageType === 'brand')
    };
    
    return NextResponse.json({
      success: true,
      data: {
        animals,
        brands,
        seo
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