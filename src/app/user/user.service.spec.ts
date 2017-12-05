import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';

describe('Service: User', () => {

    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserService
            ]
        });

        userService = TestBed.get(UserService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('saveUser: should return an EmptyObservable if request failed', (done) => {
        const fakeUser = {} as any;

        userService.saveUser(fakeUser)
            .subscribe(user => {
                expect(true).toBeFalsy();
            }, error => {

            }, () => {
                done();
            });

        const saveRequest = httpMock.expectOne(`${environment.apiUrl}/profiles`);
        saveRequest.error(new ErrorEvent('ERROR_SAVING_USER'));

        httpMock.verify();
    });

    it('saveUser: should return if user creation request succeeds', (done) => {
        const fakeUser = {} as any;
        const expectedResponse = { userId: 1};

        userService.saveUser(fakeUser)
            .subscribe(user => {
                expect(user).toBe(expectedResponse);
                done();
            });

        const saveRequest = httpMock.expectOne(`${environment.apiUrl}/profiles`);
        saveRequest.flush(expectedResponse);

        httpMock.verify();
    });

    it('saveUser: should return null if user update request succeeds', (done) => {
        const fakeUser = { userId: 1 } as any;

        userService.saveUser(fakeUser)
            .subscribe(user => {
                expect(user).toEqual('null');
                done();
        });

        const saveRequest = httpMock.expectOne(`${environment.apiUrl}/profiles/${fakeUser.userId}`);
        saveRequest.flush(null);

        httpMock.verify();
    });

});
