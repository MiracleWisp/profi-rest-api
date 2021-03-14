import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { NoteTitleInterceptor } from './interceptor/note-title-interceptor.service';
import { Note } from './interfaces/note.interface';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@UseInterceptors(NoteTitleInterceptor)
@Controller('notes')
export class NotesController {

  constructor(private notesService: NotesService) {
  }

  @Get()
  findAll(@Param('query') query: string): Note[] {
    return this.notesService.getNotes(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Note {
    const note = this.notesService.getNote(id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Note {
    return this.notesService.createNote(createNoteDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Note {
    const note = this.notesService.updateNote(id, updateNoteDto);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    this.notesService.deleteNote(id);
  }
}
