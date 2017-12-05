import { ActionReducer, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../models/user';

export const USERS_STATE_NAME = 'users';

export interface UserState {
    user: User,
    loading: boolean,
    saving: boolean,
    error: string;
}

export const InitialState: UserState = {
    user: null,
    loading: false,
    saving: false,
    error: null
};

export function userReducer(state = InitialState, action: UserActions.ActionTypes) {
  switch (action.type) {

    case UserActions.LOAD_USER:
      return {
        user: action.payload,
        loading: false,
        saving: false,
        error: null
      };

      case UserActions.GET_USER:
      return {
        ...state,
        ...{
            loading: true,
            saving: false,
            error: null
        }
      };

      case UserActions.SAVE_USER:
      return {
        ...state,
        ...{
            loading: false,
            saving: true,
            error: null
        }
      };

      case UserActions.USER_ERROR:
      return {
        ...state,
        ...{
            loading: false,
            saving: false,
            error: action.payload
        }
      };

      case UserActions.SAVE_SUCCESSFUL:
      return {
        ...state,
        ...{
            loading: false,
            saving: false,
            error: null
        }
      };

    default:
      return state;
  }
}
