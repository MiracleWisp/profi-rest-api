import { Injectable } from '@nestjs/common';
import { Note } from './entity/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {

  private notes: Note[] = [];

  getNotes(query?: string): Note[] {
    return query ? this.notes.filter(note => note.title.includes(query) || note.content.includes(query)) : this.notes;
  }

  getNote(id: string): Note {
    return this.notes.find(note => note.id === id);
  }

  createNote(createNoteDto: CreateNoteDto): Note {
    const note: Note = {
      id: uuidv4(),
      ...createNoteDto,
    };
    this.notes.push(note);
    return note;
  }

  updateNote(id: string, updateNoteDto: UpdateNoteDto): Note {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return null;
    }
    this.notes[noteIndex] = {
      id: this.notes[noteIndex].id,
      ...updateNoteDto,
    };
    return this.notes[noteIndex];
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
