import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  console.log("Fetching notes..."); 
  const url = new URL(req.url);
  const title = url.searchParams.get('title') || '';
  const sort = url.searchParams.get('sort') || 'createdAt';
  const order = url.searchParams.get('order') || 'desc'; 

  try {
    const notes = await prisma.note.findMany({
      where: {
        title: {
          contains: title, 
          mode: 'insensitive' 
        }
      },
      orderBy: {
        [sort]: order.toLowerCase() === 'asc' ? 'asc' : 'desc' 
      }
    });

    console.log("Notes fetched:", notes);

  
    return NextResponse.json(notes, {
      status: 200,
      headers: { 
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache", 
        "Expires": "0", 
      },
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
