import { TypeOrmModule } from "@nestjs/typeorm";
import { CatEntity } from "../entities/cat.entity";

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

// export async feedCatTestDatabase( catRepo )