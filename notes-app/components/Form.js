"use client";

import { Box, Button, FormControl, FormLabel, Input, Textarea, Link as ChakraLink, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Form = ({ type, note, setNote, submitting, handleSubmit }) => {
  return (
    <Box as="section" w="full" maxW="full" d="flex" flexDirection="column" alignItems="flex-start">
      <Heading as="h1" size="xl" bgGradient="linear(to-r, blue.400, blue.600)" bgClip="text">
        {type} Post
      </Heading>
      <Text fontSize="md" color="gray.600" mt={2} textAlign="left" maxW="md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </Text>

      <Box as="form" onSubmit={handleSubmit} mt={10} w="full" maxW="2xl" d="flex" flexDirection="column" gap={7} p={5} borderRadius="md" boxShadow="lg" bg="white">
        <FormControl>
          <FormLabel fontWeight="semibold" color="gray.700">
            Your AI Prompt
          </FormLabel>
          <Textarea
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            placeholder="Write your post here"
            required
            size="md"
            resize="vertical"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="semibold" color="gray.700">
            Field of Prompt{" "}
            <Text as="span" fontWeight="normal">
              (#product, #webdevelopment, #idea, etc.)
            </Text>
          </FormLabel>
          <Input
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            size="md"
          />
        </FormControl>

        <Box d="flex" justifyContent="flex-end" mx={3} mb={5} gap={4}>
          <ChakraLink as={Link} href="/" color="gray.500" fontSize="sm">
            Cancel
          </ChakraLink>

          <Button
            type="submit"
            isLoading={submitting}
            loadingText={`${type}ing...`}
            colorScheme="orange"
            size="sm"
            rounded="full"
          >
            {type}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
