import { createReducer, on } from '@ngrx/store';
import * as searchActions from '../actions/search.actions';
import * as favoriteActions from '../actions/favorite.actions';
import * as customActions from '../actions/custom-card.actions';
import { IVideosState } from '../state.models';

export const initialState: IVideosState = {
  source: null,
  searchListIds: [],
  customCardsIds: [],
  favorite: [],
  pageNumber: 1,
  tokens: {
    nextPageToken: '',
    prevPageToken: '',
  },
};
export const getVideos = createReducer(
  initialState,
  on(searchActions.getVideos, (state, action) => ({
    ...state,
    source: { ...state.source, ...action.payload.items },
    searchListIds: Object.keys(action.payload.items),
    tokens: action.payload.tokens,
  })),

  on(
    searchActions.getNextVideos,
    (state): IVideosState => ({
      ...state,
      pageNumber: state.pageNumber + 1,
    })
  ),

  on(
    searchActions.getPrevVideos,
    (state): IVideosState => ({
      ...state,
      pageNumber: state.pageNumber > 1 ? state.pageNumber - 1 : 1,
    })
  ),

  on(favoriteActions.toggle, (state, { id }) => ({
    ...state,
    favorite: state.favorite.includes(id)
      ? state.favorite.filter((elem) => elem !== id)
      : [...state.favorite, id],
  })),

  on(customActions.createCard, (state, action) => ({
    ...state,
    source: { ...action.payload, ...state.source },
    customCardsIds: [
      ...state.customCardsIds,
      Object.keys(action.payload).toString(),
    ],
  })),

  on(customActions.removeCard, (state, { id }) => {
    const customCards = [...state.customCardsIds];
    const idx = customCards.findIndex((elem) => elem === id);
    customCards.splice(idx, 1);
    return { ...state, customCardsIds: customCards };
  })
);
