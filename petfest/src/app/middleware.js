import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const protectedPaths = ['/admin'];

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Check if path is protected
  const isProtectedPath = protectedPaths.some(protPath => 
    path === protPath || path.startsWith(`${protPath}/`)
  );
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // Token is invalid
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};