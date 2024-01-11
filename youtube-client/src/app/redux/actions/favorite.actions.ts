import { createAction, props } from '@ngrx/store';

export const toggle = createAction(
  '[FAVORITE] toggle',
  props<{ id: string }>()
);
