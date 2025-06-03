import type { Note } from "../generated/prisma";

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateNote = Partial<CreateNote> 
