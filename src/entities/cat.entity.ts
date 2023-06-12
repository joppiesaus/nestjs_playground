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
