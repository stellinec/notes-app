"use client"
import { useEffect, useState } from "react";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import NoteCard from "../components/NoteCard"; // Adjust the path as needed

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/note'); 
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/note/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id)); // Remove the deleted note from the state
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  if (loading) {
    return (
    <Flex align="center"
    justify="center"
    height="100vh" // Full viewport height
    width="100vw">
      <Spinner size="xl" />
    </Flex>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Flex direction="column"  p={4} gap={4}>
       <Flex align="center" justify="center">
        <Link href="/create-note" style={{ marginBottom: "1rem" }}>
        <Button
          colorScheme="blue"
          variant="solid"
          mb="1rem"
          _hover={{ bg: "blue.800" }} 
        >  Create Note
        </Button>
        </Link>
      </Flex>
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))
      ) : (
         <Flex align="center" justify="center">
          <p>No notes available</p>
        </Flex>
      )}
    </Flex>
  );
}
