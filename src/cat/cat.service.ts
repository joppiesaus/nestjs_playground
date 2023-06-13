import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatDTO, CatEntity } from 'src/entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
    
    constructor(
        @InjectRepository( CatEntity ) private catRepo: Repository< CatEntity > 
    ) {

    }

    private prettyString( cat: CatEntity ) {

        if (!cat) {
            return "haha lol no cat xD";
        }

        return "Name: " + cat.name + ", description: " + cat.description;

    }

    private prettyObject( cat: CatEntity ): CatDTO {

        if (!cat) {
            return null;
        }

        return new CatDTO( cat.id, cat.name, cat.description );

    }


    async newCat( name: string, description: string ) {

        let cat = new CatEntity();
        cat.name = name;
        cat.description = description;

        const result = await this.catRepo.insert( cat );
        return { result };

    }

    async getCat( id: number ): Promise<CatDTO> {

        const cat = await this.catRepo.findOneBy( { id } );
        return this.prettyObject( cat );

    }

    async deleteCat( id: number ): Promise<boolean> {

        const cat = await this.catRepo.delete( { id: id } );
        return cat.affected == 1;

    }

    async getAllCats(): Promise<Array<CatDTO>> {

        const cats = await this.catRepo.find();
        return cats.map( (cat) => this.prettyObject( cat ) );

    }

}
