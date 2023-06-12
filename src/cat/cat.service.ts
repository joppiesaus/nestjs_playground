import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from 'src/entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
    
    constructor(
        @InjectRepository( CatEntity ) private catRepo: Repository< CatEntity > 
    ) {}

    private prettyString( cat: CatEntity ) {

        if (!cat) {
            return "haha lol no cat xD";
        }

        return "Name: " + cat.name + ", description: " + cat.description;

    }

    async newCat( name: string, description: string ) {

        let cat = new CatEntity();
        cat.name = name;
        cat.description = description;

        const result = await this.catRepo.insert( cat );
        return { result };

    }

    async getCat( id: number ): Promise<String> {

        const cat = await this.catRepo.findOneBy( { id } );
        return this.prettyString( cat );

    }

    async getAllCats(): Promise<Array<String>> {

        const cats = await this.catRepo.find();
        return cats.map( (cat) => this.prettyString( cat ) );

    }

}
