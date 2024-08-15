"use client";

import { Box, IconButton, Text, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa"; 

const NoteCard = ({ note }) => {
  const router = useRouter();

 
  const handleCardClick = () => {
    router.push(`/detail/${note.id}`); 
  };

  const handleEdit = (e) => {
    e.stopPropagation(); 
    router.push(`/update-note/${note.id}`); 
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
      onClick={handleCardClick} 
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
              bg: "gray.700",     
              color: "whiteAlpha.900"  
            }}
          />
         
        </Flex>
      </Flex>
    </Box>
  );
};

export default NoteCard;
