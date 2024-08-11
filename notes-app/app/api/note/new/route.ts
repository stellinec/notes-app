// app/api/note/new/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust path as necessary

// Function to generate auto-increment ID
async function generateAutoIncrementId() {
  const lastNote = await prisma.note.findFirst({
    orderBy: { id: 'desc' },
  });

  if (!lastNote) {
    return 'NOTE-00001';
  }

  const lastId = lastNote.id;
  const idNumber = parseInt(lastId.split('-')[1], 10);
  const newIdNumber = idNumber + 1;

  return `NOTE-${newIdNumber.toString().padStart(5, '0')}`;
}

// Handle POST request
export async function POST(req: Request) {
  try {
    const { title, body } = await req.json();

    // Generate a new ID
    const id = await generateAutoIncrementId();

    // Create a new note in the database
    const newNote = await prisma.note.create({
      data: {
        id,
        title,
        body,
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
}
