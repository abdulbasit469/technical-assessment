import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { VISIT_VIA, VisitVia } from '../schemas/visit.schema';

export class BrowseDto {
  @IsString()
  @IsNotEmpty()
  person: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @IsIn(VISIT_VIA)
  via: VisitVia;
}

export class PublishDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50000)
  html: string;
}