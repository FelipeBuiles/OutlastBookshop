import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LowdbService } from './lowdb/lowdb.service';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [AppController],
  providers: [AppService, LowdbService],
})
export class AppModule {}
