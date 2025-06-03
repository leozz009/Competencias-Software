"use client";
import React, { useEffect, useState, useRef } from "react";
import { useNotes } from "@/context/NoteContext";

export const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
      setError(null);
    }
  }, [selectedNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === "") {
      setError("El título no puede estar vacío.");
      titleRef.current?.focus();
      return;
    }

    setError(null);

    if (selectedNote) {
      await updateNote(selectedNote.id, {
        title: title.trim(),
        content,
      });
      setSelectedNote(null);
    } else {
      await createNote({
        title: title.trim(),
        content,
      });
    }
    setTitle("");
    setContent("");
    titleRef.current?.focus();
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              autoFocus
              placeholder="Título de tu nota..."
              className={`w-full px-4 py-3 text-white placeholder-white/60 bg-white/5 border 
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white backdrop-blur-sm transition-all duration-300`}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              ref={titleRef}
            />
          </div>

          <div>
            <textarea
              name="content"
              placeholder="Escribe tu contenido aquí..."
              rows={4}
              className="w-full px-4 py-3 text-white placeholder-white/60 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white backdrop-blur-sm transition-all duration-300 resize-none"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              className={`px-6 py-3 text-white bg-gradient-to-r from-[#9BBCBF] to-[#054040] rounded-xl transition-all duration-300 shadow-lg backdrop-blur-sm border border-[#032626] ${
                title.trim() === ""
                  ? "opacity-50 cursor-not-allowed hover:from-[#9BBCBF] hover:to-[#054040] hover:shadow-lg"
                  : "hover:from-[#F2F2F2] hover:to-[#798C8C] hover:shadow-[#054040]"
              }`}
              type="submit"
              disabled={title.trim() === ""}
            >
              {selectedNote ? "Actualizar Nota" : "Crear Nota"}
            </button>

            {selectedNote && (
              <button
                className="px-6 py-3 text-white bg-gradient-to-r from-red-500/80 to-pink-500/80 rounded-xl hover:from-red-600/90 hover:to-pink-600/90 transition-all duration-300 shadow-lg hover:shadow-red-500/25 backdrop-blur-sm border border-white/10"
                type="button"
                onClick={() => {
                  setSelectedNote(null);
                  setTitle("");
                  setContent("");
                  setError(null);
                  titleRef.current?.focus();
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
