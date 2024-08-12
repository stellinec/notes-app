"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, Spinner } from "@chakra-ui/react";
import Form from "../../../components/Form";

const UpdateNote = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the note ID from the URL

  const [submitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the note details when the component mounts
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/note/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNote({
            title: data.title,
            body: data.body,
          });
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

  const updateNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Updating note with data:', note);

    try {
      const response = await fetch(`/api/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Form
      type="Update"
      note={note}
      setNote={setNote}
      submitting={submitting}
      handleSubmit={updateNote}
    />
  );
};

export default UpdateNote;
