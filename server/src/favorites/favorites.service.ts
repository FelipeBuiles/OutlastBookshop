import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { LowdbService } from 'src/lowdb/lowdb.service';

@Injectable()
export class FavoritesService {
  constructor(private lowdbService: LowdbService) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.lowdbService.set(createFavoriteDto.userId, []);
  }

  findOne(id: string) {
    return this.lowdbService.findByUser(id);
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return this.lowdbService.set(id, updateFavoriteDto.books);
  }
}
