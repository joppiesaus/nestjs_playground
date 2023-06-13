import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity( { orderBy: { id: 'DESC' } } )
export class CatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { nullable: false, default: 'cat' } )
    name: string;

    @Column( { nullable: false, default: 'among us sus' } )
    description: string;

    // @Column( { nullable: false, type: "timestamptz", default: new Date() } )
    // date: Date;
}

export class CatDTO {
    id: number;
    name: string;
    description: string;

    constructor( id: number, name: string, description: string ) {

        this.id = id;
        this.name = name;
        this.description = description;

    }

    public prettyString(): string {

        return "Name: " + this.name + ", description: " + this.description;

    }
}
