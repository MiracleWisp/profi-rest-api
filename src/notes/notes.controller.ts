import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { NoteTitleInterceptor } from './interceptor/note-title-interceptor.service';
import { Note } from './entity/note.entity';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@UseInterceptors(NoteTitleInterceptor)
@Controller('notes')
@ApiTags('notes')
export class NotesController {

  constructor(private notesService: NotesService) {
  }

  @Get()
  @ApiOkResponse({ type: [Note]})
  findAll(@Query('query') query: string): Note[] {
    return this.notesService.getNotes(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Note })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Note {
    const note = this.notesService.getNote(id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  @Post()
  @ApiCreatedResponse({ type: Note })
  create(@Body() createNoteDto: CreateNoteDto): Note {
    return this.notesService.createNote(createNoteDto);
  }

  @Put(':id')
  @ApiOkResponse({type: Note})
  @ApiNotFoundResponse()
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Note {
    const note = this.notesService.updateNote(id, updateNoteDto);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  delete(@Param('id') id: string): void {
    this.notesService.deleteNote(id);
  }
}
