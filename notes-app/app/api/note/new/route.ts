import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; 
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

export async function POST(req: Request) {
  try {
    const { title, body } = await req.json();
    const id = await generateAutoIncrementId();
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
