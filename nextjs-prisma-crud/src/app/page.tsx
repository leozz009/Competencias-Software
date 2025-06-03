"use client";

import { NoteForm } from "@/components/NoteForm";
import { useEffect } from "react";
import { useNotes } from "@/context/NoteContext";
import { NoteCard } from "@/components/NoteCard";

function HomePage() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="items-center justify-center h-screen">
      <div>
        <NoteForm />
        {notes.map((note) => (
          <NoteCard key={note.id} note={note}/>
        ))}
      </div>
    </div>
  );
}

export default HomePage;