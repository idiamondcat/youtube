import { ActionReducerMap } from '@ngrx/store';
import { environment } from '../../../environments/environment.development';
import { getVideos } from './getVideos.reducers';
import { IVideosState } from '../state.models';

export interface State {
  videos: IVideosState;
}
export const reducers: ActionReducerMap<State> = {
  videos: getVideos,
};
export const metaReducers = !environment.production ? [] : [];
