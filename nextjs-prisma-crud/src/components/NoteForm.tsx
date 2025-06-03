"use client";
import React, { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import { useNotes } from "@/context/NoteContext";

export const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (selectedNote) {
          updateNote(selectedNote.id, {
            title,
            content,
          });
          setSelectedNote(null);
        } else {
          await createNote({
          title,
          content,
        });
        }
        
        setTitle("");
        setContent("");
        titleRef.current?.focus;
      }}
    >
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus: ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />

      <textarea
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus: ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex justify-end gap-x-2">
        <button
          className="px-5 py-2 text-black bg-[#edf2f2] rounded-3xl hover:bg-[#c6d3d7]"
          type="submit"
        >
          {
            selectedNote ? "Update Note" : "Create Note"
          }
        </button>

        {selectedNote && (
          <button
            className="px-5 py-2 text-white bg-red-600 rounded-3xl hover:bg-red-700"
            type="button"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
