"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, Heading, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import Link from "next/link";

const Detail = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the note ID from the URL

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/note/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNote(data);
        } else {
          console.error("Failed to fetch note details");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <Flex
        align="center"
        justify="center"
        height="100vh" // Full viewport height
        width="100vw"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!note) {
    return <p>Note not found</p>;
  }

  return (
    <Flex
      direction="column"
      minHeight="100vh" // Ensure the container takes at least the full viewport height
    >
      <Box  p={4} maxW="xl" mx="auto" mt={8} flex="1">
        <Heading as="h1" size="xl" mb={4}>
          {note.title}
        </Heading>
        <Text fontSize="lg" mb={4}>
          {note.body}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Created at: {new Date(note.createdAt).toLocaleString()}
        </Text>
      </Box>
      <Flex
        align="center"
        justify="center"
        mb={4}
      >
        <Button
          colorScheme="blue"
          variant="solid"
          _hover={{ bg: "blue.800" }}
        >
          <Link href="/">Back</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Detail;
