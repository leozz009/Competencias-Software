import React from "react";
import type { Note } from "../generated/prisma";
import { useNotes } from "@/context/NoteContext";

export const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div className="group">
      <div 
        key={note.id} 
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 my-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h1 className="text-2xl font-bold text-[#9BBCBF] mb-3 group-hover:text-white transition-colors duration-300">
              {note.title}
            </h1>
            <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
              {note.content}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 min-w-fit">
            <button
              onClick={() => setSelectedNote(note)}
              className="px-4 py-2 bg-[#9BBCBF] text-[#021C1F] rounded-md hover:bg-[#798C8C] transition"
            >
              Editar
            </button>
            
            <button
              onClick={async () => {
                if (confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
                  await deleteNote(Number(note.id));
                }
              }}
              className="px-4 py-2 bg-[#F2F2F2] text-[#021C1F] rounded-md hover:bg-[#798C8C] transition"
            >
              Eliminar
            </button>
          </div>
        </div>
        
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9BBCBF]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};