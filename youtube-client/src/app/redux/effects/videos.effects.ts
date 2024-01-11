import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { YoutubeService } from '../../youtube/services/youtube.service';
import * as searchActions from '../actions/search.actions';

@Injectable()
export class VideosEffect {
  constructor(
    private actions: Actions,
    private service: YoutubeService
  ) {}
  updateVideos = createEffect(() => {
    return this.actions.pipe(
      ofType(searchActions.search),
      switchMap(({ searchText, token }) =>
        this.service.searchItems(searchText, token)
      ),
      map((videos) => searchActions.getVideos({ payload: videos }))
    );
  });
}
