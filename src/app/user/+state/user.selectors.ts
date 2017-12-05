import { USERS_STATE_NAME, UserState } from './user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>(USERS_STATE_NAME);

export const selectUser = createSelector(selectUserState, (state) => state.user);
export const selectLoading = createSelector(selectUserState, (state) => state.loading);
export const selectSaving = createSelector(selectUserState, (state) => state.saving);
export const selectError = createSelector(selectUserState, (state) => state.error);

