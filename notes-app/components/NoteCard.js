"use client";

import { Box, IconButton, Text, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa"; // Import icons from react-icons

const NoteCard = ({ note }) => {
  const router = useRouter();

  // Handle card click to navigate to note detail page
  const handleCardClick = () => {
    router.push(`/detail/${note.id}`); // Navigate to detail page with note ID
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the card
    router.push(`/update-note/${note.id}`); // Navigate to update page
  };



  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p={4}
      height="fit-content"
      boxShadow="md"
      bg="white"
      _hover={{ boxShadow: "lg" }}
      cursor="pointer"
      onClick={handleCardClick} // Handle card click to navigate to detail page
    >
      <Flex direction="column" gap={4}>
        <Heading size="md"  color="gray.800">{note.title}</Heading>
        <Text fontSize="sm" color="gray.600">{note.body}</Text>
       
        <Flex direction="row" gap={3} mt={4} justify="space-between" align="center">
        <Text fontSize="xs" color="gray.400">Created at: {new Date(note.createdAt).toLocaleString()}</Text>

          <IconButton
            aria-label="Edit Note"
            icon={<FaPen />}
            bg="black"           
            color="white"  
            onClick={handleEdit}
            rounded="full"
            _hover={{
              bg: "gray.700",     // Background color on hover
              color: "whiteAlpha.900"  // Icon color on hover
            }}
          />
         
        </Flex>
      </Flex>
    </Box>
  );
};

export default NoteCard;
