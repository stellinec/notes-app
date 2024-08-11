import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust the path to where prisma is initialized

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' }, // Optional: Order by creation date
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.error();
  }
}
