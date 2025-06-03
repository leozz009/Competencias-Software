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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#9BBCBF] ">
            CRUD de Notas - Evaluación de competencias
          </h1>
          <p className="text-white text-lg">
            Creación, edición y eliminación de notas con Prisma y Next.js
          </p>
        </div>

        <NoteForm />
        <div className="space-y-2">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-white/70 text-xl mb-2">El espacio está vacío...</h3>
                <p className="text-white/50">No tienes ninguna nota</p>
              </div>
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard key={note.id} note={note}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;