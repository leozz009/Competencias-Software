"use client";
import { createContext, useState, useContext } from "react";
import { CreateNote, UpdateNote } from "../types/note";
import type { Note } from "../generated/prisma";

export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  updateNote: (id: number, note: UpdateNote) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  deleteNote: async (id: number) => {},
  updateNote: async (id: number, note: UpdateNote) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
});

export const useNotes = () => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  async function loadNotes() {
    const res = await fetch("http://localhost:3000/api/notes");
    const data = await res.json();
    setNotes(data.notes);
  }

  async function createNote(note: CreateNote) {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json",
      },
    });

    const newNote: Note = await res.json();
    setNotes([...notes, newNote]);
  }

  async function deleteNote(id: number) {
    const res = await fetch("http://localhost:3000/api/notes/" + id, {
      method: "DELETE",
    });

    const data = await res.json;
    setNotes(notes.filter((note) => note.id !== id));
  }

  async function updateNote(id: number, note: UpdateNote) {
    const res = await fetch("http://localhost:3000/api/notes/" + id, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...data } : n)));
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        updateNote,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
