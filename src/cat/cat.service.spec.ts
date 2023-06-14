import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { SQLiteTestingModule } from '../test-utils/SQLiteTestingModule';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ...SQLiteTestingModule() ],
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
  

    await service.newCat( "pukkie", "a very friendly cat" );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it( "should create cat pukkie", async () => {

    const result = await service.newCat( "pukkie", "a very friendly cat" );
    expect( result ).toBeDefined();

  } );

  it( "should return cat pukkie", async () => {

    const cat = await service.getCat( 1 );
    expect( cat.name ).toBe( "pukkie" );
    expect( cat.id ).toBe( 1 );

  });
});
