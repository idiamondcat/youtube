import { createAction, props } from '@ngrx/store';
import { IStoreObject } from '../state.models';

export const search = createAction(
  '[SEARCH_VIDEOS] search',
  props<{ searchText: string; token: string }>()
);
export const getVideos = createAction(
  '[SEARCH_VIDEOS] getVideos',
  props<{ payload: IStoreObject }>()
);
export const getNextVideos = createAction('[SEARCH_VIDEOS] getNextVideos');
export const getPrevVideos = createAction('[SEARCH_VIDEOS] getPrevVideos');
