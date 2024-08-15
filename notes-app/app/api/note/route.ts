import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  console.log("Fetching notes..."); // Debug log

  // Extract query parameters from the request URL
  const url = new URL(req.url);
  const title = url.searchParams.get('title') || '';
  const sort = url.searchParams.get('sort') || 'createdAt'; // default sort field
  const order = url.searchParams.get('order') || 'desc'; // default sort order

  try {
    // Construct the Prisma query dynamically based on parameters
    const notes = await prisma.note.findMany({
      where: {
        title: {
          contains: title, // Filter notes by title if provided
          mode: 'insensitive' // Case-insensitive search
        }
      },
      orderBy: {
        [sort]: order.toLowerCase() === 'asc' ? 'asc' : 'desc' // Sort based on parameters
      }
    });

    console.log("Notes fetched:", notes); // Debug log

    // Return the response with notes directly
    return NextResponse.json(notes, {
      status: 200,
      headers: { 
        "Cache-Control": "no-cache, no-store, must-revalidate", // Prevent caching
        "Pragma": "no-cache", // For HTTP/1.0 caches
        "Expires": "0", // For HTTP/1.0 caches
      },
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
