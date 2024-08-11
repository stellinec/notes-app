"use client";

import { Box, Button, Text, Flex, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const NoteCard = ({ note, onDelete }) => {
  const router = useRouter();

  // Handle card click to navigate to note detail page
  const handleCardClick = () => {
    router.push(`/detail/${note.id}`); // Navigate to detail page with note ID
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the card
    router.push(`/update-note/${note.id}`); // Navigate to update page
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the card
    try {
      await onDelete(note.id); // Call the delete handler from the parent component
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg="white"
      _hover={{ boxShadow: "lg" }}
      cursor="pointer"
      onClick={handleCardClick} // Handle card click to navigate to detail page
    >
      <Flex direction="column" gap={4}>
        <Heading size="md" color="gray.800">{note.title}</Heading>
        <Text fontSize="sm" color="gray.600">{note.body}</Text>
        <Text fontSize="xs" color="gray.400">Created at: {new Date(note.createdAt).toLocaleString()}</Text>

        <Stack direction="row" spacing={4} mt={4}>
          <Button colorScheme="teal" onClick={handleEdit}>Edit</Button>
          <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default NoteCard;
