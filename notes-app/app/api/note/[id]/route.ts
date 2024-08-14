import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json({ error: 'ID parameter is missing' }, { status: 400 });
    }

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, body } = await request.json();

  try {
    if (!id || !title || !body) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, body },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID parameter is missing' }, { status: 400 });
    }

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
