import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { LowdbService } from 'src/lowdb/lowdb.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, LowdbService],
})
export class FavoritesModule {}
