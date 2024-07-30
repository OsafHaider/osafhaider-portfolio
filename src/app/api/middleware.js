// app/api/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // API middleware logic
  console.log('API Middleware');
  return NextResponse.next();
}
