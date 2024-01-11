import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/main';
import { IVideosState } from '../state.models';

export const selectSearchSourceSlice = createFeatureSelector<State>('videos');
export const selectState = createSelector(
  selectSearchSourceSlice,
  (state: State) => state.videos
);
export const selectSource = createSelector(
  selectState,
  (state: IVideosState) => (state.source ? state.source : null)
);
export const selectList = createSelector(
  selectState,
  (state: IVideosState) => state.searchListIds
);
export const selectFavorite = createSelector(
  selectState,
  (state: IVideosState) => state.favorite
);
export const selectTokens = createSelector(
  selectState,
  (state: IVideosState) => state.tokens
);
export const selectPageNumber = createSelector(
  selectState,
  (state: IVideosState) => state.pageNumber
);
export const selectCustomCards = createSelector(
  selectState,
  (state: IVideosState) => state.customCardsIds
);
export const selectSearch = createSelector(
  selectSource,
  selectList,
  (source, list) => (source ? list.map((id) => source[id]) : null)
);
export const selectFavoriteObj = createSelector(
  selectSource,
  selectFavorite,
  (source, favorite) =>
    source
      ? Object.values(source).filter((elem) =>
          typeof elem.id === 'string' ? favorite.includes(elem.id) : null
        )
      : null
);
export const selectCustomCardsObj = createSelector(
  selectSource,
  selectCustomCards,
  (source, customList) => (source ? customList.map((id) => source[id]) : null)
);
export const selectCombineCards = createSelector(
  selectState,
  selectSearch,
  selectCustomCardsObj,
  (state, list, customList) =>
    state.tokens.prevPageToken
      ? list
      : customList && customList.length !== 0 && list
      ? [...customList, ...list].slice(0, -customList.length)
      : list
);
export const selectVideoById = (id: string) =>
  createSelector(selectSource, (source) => (source ? source[id] : null));
