// Example: Ensuring dynamic response in API route
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return new NextResponse(JSON.stringify(notes), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
