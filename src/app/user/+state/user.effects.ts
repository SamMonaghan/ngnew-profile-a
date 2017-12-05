import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as UserActions from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {

    @Effect()
    getUser$ = this.actions$
        .ofType<UserActions.GetAction>(UserActions.GET_USER)
        .pipe(
            switchMap((action) => {
                return this.userService.getUser(action.payload)
                .pipe(
                    map((user) => {
                        return new UserActions.LoadAction(user);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        console.error('USER GET EFFECT', error);
                        const message = error.status === 404 ? 'User Not Found' : error.statusText;
                        return of(new UserActions.ErrorAction(message));
                    })
                );
            })
        );

    @Effect()
    saveUser$ = this.actions$
        .ofType<UserActions.SaveAction>(UserActions.SAVE_USER)
        .pipe(
            switchMap((action) => {
                return this.userService.saveUser(action.payload)
                .pipe(
                    map((user) => {
                        if (user) {
                            console.log('LOAD ACTION EFFECT');
                            return new UserActions.LoadAction(user);
                        } else {
                            console.log('SAVE SUCCESS EFFECT');
                            return new UserActions.SaveSuccessAction();
                        }
                    }),
                    catchError((error: HttpErrorResponse) => {
                        console.error('USER SAVE EFFECT', error);
                        return of(new UserActions.ErrorAction('Error Saving User: ' + error.statusText));
                    })
                );
            })
        );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
