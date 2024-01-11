import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './pages/favorite-videos/favorite.component';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { YoutubeModule } from '../youtube/youtube.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, FavoriteRoutingModule, YoutubeModule],
})
export class FavoriteModule {}
