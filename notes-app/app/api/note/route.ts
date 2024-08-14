// Assuming this is your fetch notes API route in lib/prisma.ts or similar
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust the path as necessary

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' }, // Optional: Order by creation date
    });
    console.log('Fetched notes:', notes); // Add a log to check the notes fetched
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.error();
  }
}
