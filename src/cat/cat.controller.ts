import { Controller, Get, Param, Body, Header, Response, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDTO } from 'src/entities/cat.entity';

@Controller('/cat')
export class CatController {

    constructor( private readonly catService: CatService ) {

    }

    @Get("/new")
    async newCatTest() {
        const result = await this.catService.newCat("joe biden", "willlll     " + Math.random());
        return result;
    }

    @Post("/new")
    async newCat( @Body() cat_body: CatDTO ) {
        const result = await this.catService.newCat( cat_body.name, cat_body.description );
        return result;
    }

    @Get("all")
    @Header("Gamer-Moment", "epic")
    async getAllCats() {

        const cats = await this.catService.getAllCats();

        return cats.map( ( cat ) => cat.prettyString() ).join(",<br>");

    }

    @Get("all.json")
    async getAllCatsJson() {

        return await this.catService.getAllCats();

    }
    
    // TODO: RESPONSE CODe when it fails
    @Get(":id")
    async getCatById( @Body() body, @Param("id") id ) {

        const idNum = parseInt( id );

        if (Number.isNaN(idNum)) {
            return "THAT'S NOT AN VALID CAT!!";
        }

        const message = await this.catService.getCat( idNum );

        return message;

    }

    
}
