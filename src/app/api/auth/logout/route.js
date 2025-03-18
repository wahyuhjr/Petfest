// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Menghapus cookie autentikasi
  cookies().set({
    name: 'auth-token',
    value: '',
    expires: new Date(0),
    path: '/',
  });
  
  return NextResponse.json({ success: true, message: 'Logout successful' });
}