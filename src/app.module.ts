import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './entities/cat.entity';
import { CatModule } from './cat/cat.module';
import { CatService } from './cat/cat.service';
import { CatController } from './cat/cat.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot( {
      type: 'sqlite',
      database: './amogus.db',
      synchronize: true,
      logging: false,
      entities: [CatEntity],
      migrations: [],
      subscribers: [],
    } ),
    CatModule

  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
