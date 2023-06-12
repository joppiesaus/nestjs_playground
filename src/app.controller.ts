import { Controller, Get, Header, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get("cat")
  // getCat(): string {
  //   return "Cat " + Math.floor(Math.random() * 10000);
  // }

  // @Get("cat/:id")
  // @Header("derp", "yeet")
  // getCatId( @Body() body, @Param('id') id): string {
  //   return parseInt(id) * 5 + "";
  // }
}
