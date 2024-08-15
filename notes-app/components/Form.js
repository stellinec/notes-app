"use client";

import { Box, Button, FormControl, FormLabel, Input, Textarea, Link as ChakraLink, Heading, Text, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const Form = ({ type, note, setNote, submitting, handleSubmit }) => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Heading mt="20" as="h1" size="xl"  fontFamily="Montserrat" bgGradient="linear(to-r, blue.400, blue.600)" bgClip="text">
        {type} Note
      </Heading>
      

      <Box as="form" onSubmit={handleSubmit} mt={10} w="full" maxW="2xl" d="flex" flexDirection="column" gap={7} p={5} borderRadius="md" boxShadow="lg" bg="white">
        <FormControl>
          <FormLabel fontWeight="semibold" color="gray.700">
            Title
          </FormLabel>
          <Input
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            placeholder="Write your title here"
            required
            size="md"
           
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold" color="gray.700" mt="6">
            Body
          </FormLabel>
          <Textarea
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
            type="text"
            placeholder="Write your note here"
            required
            size="md"
             resize="vertical"
          />
        </FormControl>

        <Flex  justifyContent="center" mx={3} mb={5} mt={8} gap={5}>
        <Link href="/">
          <Button colorScheme="blue" variant="solid" rounded="full">
           Back
          </Button>
        </Link>
          <Button
            type="submit"
            isLoading={submitting}
            loadingText={`${type}...`}
            colorScheme="orange"
            
            rounded="full"
          >
            {type}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Form;
