import React from "react";
import type { Note } from "../generated/prisma";
import { useNotes } from "@/context/NoteContext";

export const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div>
      <div key={note.id} className="bg-sky-50 p-4 my-2 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{note.title}</h1>
          <p>{note.content}</p>
        </div>
        <div className="flex gap-x-3">
          <button
            onClick={async () => {
              if (confirm("Are you sure you want to delete this note?")) {
                await deleteNote(Number(note.id));
              }
            }}
          >
            Delete
          </button>
          <button onClick={() => setSelectedNote(note)}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
