"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";

const CreateNote = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState({ title: "", body: "" });

  const createNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Creating note with data:', note);
    try {
      const response = await fetch("/api/note/new", {
        method: "POST",
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

  return (
    <Form
      type="Create"
      note={note}
      setNote={setNote}
      submitting={submitting}
      handleSubmit={createNote}
    />
  );
};

export default CreateNote;
