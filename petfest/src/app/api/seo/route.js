import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'seo-config.json');

// Get SEO settings
export async function GET() {
  try {
    if (!fs.existsSync(configPath)) {
      // If file doesn't exist, return default values
      return NextResponse.json({
        siteTitle: 'Animal Voting App',
        metaDescription: 'Vote for your favorite animals!',
        keywords: 'animals, pets, voting, cute animals',
        ogImage: 'https://example.com/default-og-image.jpg',
        googleAnalyticsId: '',
      });
    }
    
    const fileData = fs.readFileSync(configPath, 'utf8');
    const seoSettings = JSON.parse(fileData);
    
    return NextResponse.json(seoSettings);
  } catch (error) {
    console.error('Error getting SEO settings:', error);
    return NextResponse.json(
      { message: 'Failed to get SEO settings', error: error.message },
      { status: 500 }
    );
  }
}

// Save SEO settings
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.siteTitle) {
      return NextResponse.json(
        { message: 'Site title is required' },
        { status: 400 }
      );
    }
    
    // Save to file
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json(
      { message: 'SEO settings updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving SEO settings:', error);
    return NextResponse.json(
      { message: 'Failed to update SEO settings', error: error.message },
      { status: 500 }
    );
  }
}