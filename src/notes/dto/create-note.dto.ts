import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false
  })  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
