import { catchError, delay } from 'rxjs/operators';
import { User } from './models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/profiles/${userId}`);
  }

  saveUser(user: User): Observable<User | any> {

    if (!user.userId) {
      return this.httpClient.post<User>(
        `${environment.apiUrl}/profiles`, user, { headers: new HttpHeaders().set('content-type', 'application/json') }
      )
      .pipe(catchError(this.errorHandler));

    } else {

      return this.httpClient.put<void>(
        `${environment.apiUrl}/profiles/${user.userId}`, user, { headers: new HttpHeaders().set('content-type', 'application/json') }
      )
      .pipe(catchError(this.errorHandler));

    }

  }

  private errorHandler(error: Error): Observable<User> {
    console.error('USER ERROR:', error);
    return new EmptyObservable();
  }

}
