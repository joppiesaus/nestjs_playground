import { TypeOrmModule } from "@nestjs/typeorm";
import { CatEntity } from "../entities/cat.entity";
import { CatService } from "src/cat/cat.service";

export const SQLiteTestingModule = () => [

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [CatEntity],
      migrations: [],
      subscribers: [],
    } ),
    TypeOrmModule.forFeature( [ CatEntity ] )

];

export async function feedTestDatabase( serv: CatService ) {

    // TODO: this uses a service, maybe have something which already populates the database so it
    // doesn't depend on CatService
    serv.newCat( "pukkie", "a very friendly cat" );
    serv.newCat( "james", "a cat which is, kind of cool tbh" );

};
