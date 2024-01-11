import { createAction, props } from '@ngrx/store';
import IItem from '../../youtube/models/item';

export const createCard = createAction(
  '[CUSTOM] create',
  props<{ payload: { [key: string]: IItem } }>()
);
export const removeCard = createAction(
  '[CUSTOM] remove',
  props<{ id: string }>()
);
