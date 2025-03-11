// src/app/api/seo/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const seoEntries = await prisma.sEO.findMany();
    return NextResponse.json({
      success: true,
      data: seoEntries
    });
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch SEO data', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.pageType || !data.title || !data.description) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Required fields missing: pageType, title, and description are required' 
        },
        { status: 400 }
      );
    }
    
    // Create new SEO entry
    const seoEntry = await prisma.sEO.create({
      data
    });
    
    return NextResponse.json({
      success: true,
      data: seoEntry
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating SEO entry:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to create SEO entry', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}