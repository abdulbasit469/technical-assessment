import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { BrowseDto, PublishDto } from './dto';
import { WebService } from './web.service';

@Controller()
export class WebController {
  constructor(private readonly web: WebService) {}

  @Get('people')
  people() {
    return this.web.listPeople();
  }

  @Post('browse')
  @HttpCode(200)
  browse(@Body() dto: BrowseDto) {
    return this.web.browse(dto);
  }

  @Post('visits')
  @HttpCode(204)
  visit(@Body() dto: BrowseDto) {
    return this.web.visit(dto);
  }

  @Get('history')
  history(@Query('person') person = '') {
    return this.web.history(person);
  }

  @Get('search')
  search(@Query('q') query = '') {
    return this.web.search(query);
  }

  @Post('sites')
  publish(@Body() dto: PublishDto) {
    return this.web.publish(dto);
  }
}