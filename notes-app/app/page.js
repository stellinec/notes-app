"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Heading, Spinner, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/note', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched notes:", data);
          setNotes(data);
        } else {
          const errorMessage = `Failed to fetch notes: ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" height="100vh" width="100vw">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Flex direction="column" p={4} gap={4} mt={6}>
      <Flex textAlign="center" align="center" justify="center" direction="column">
        <Heading
          as="h1"
          size="xl"
          fontFamily="Montserrat"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
        >
          Welcome to MyNote
        </Heading>
        <Text>🎀 Welcome to your little corner of creativity!🌸</Text>
        <Text>Whether it's a brilliant idea, a sweet memory, or a daily to-do,</Text>
        <Text>your notes are safe and snug here.</Text>
        <Text>Tap the button, and let your thoughts bloom into a beautiful note! ✨</Text>

        <Link href="/create-note">
          <Button my="1rem" colorScheme="orange" rounded="full">
            Create Note
          </Button>
        </Link>
      </Flex>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
      >
        {notes.length > 0 ? (
          notes.map((note) => <NoteCard key={note.id} note={note} />)
        ) : (
          <Flex align="center" justify="center" gridColumn="span 3">
            <p>No notes available</p>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
