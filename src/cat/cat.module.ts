import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatEntity } from 'src/entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ CatEntity ] ),
  ],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {   
}
