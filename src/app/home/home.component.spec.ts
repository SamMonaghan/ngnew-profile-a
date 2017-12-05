import { MaterialModule } from '../lib/material/material.module';
import { DebugElement } from '@angular/core';
import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';
import { async as scheduler} from 'rxjs/scheduler/async';
import { timer } from 'rxjs/observable/timer';

describe(`Component: HomeComponent Suite`, () => {
    let component: HomeComponent = null;
    let homeService: HomeService;
    let fixture: ComponentFixture<HomeComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [MaterialModule],
            providers: [HomeService]
        });

        fixture = TestBed.createComponent(HomeComponent);
        homeService = TestBed.get(HomeService);
        component = fixture.componentInstance;
        de = fixture.debugElement;

    });

    it('check component loads', () => {
        expect(component.message).toEqual('Something something, routing is cool.');
    });

    it('should set the message property when component intialised', () => {
        spyOn(homeService, 'getMessage')
            .and.returnValue(of('FAKE MESSAGE'));

        component.ngOnInit();

        expect(component.message).toEqual('FAKE MESSAGE');
    });

    it('add 1 + 1', () => {
        expect(1 + 1).toEqual(2);
        expect(1 + 2).toBe(3);
    });

    it(`should have the message bound onto the page`, () => {
        spyOn(homeService, 'getMessage')
            .and.returnValue(of('FAKE MESSAGE 2'));

        fixture.detectChanges();

        const el = de.query(By.css('h1')).nativeElement;

        expect(el.innerText).toEqual('FAKE MESSAGE 2');
    });

    it(`should get next message on click - with fakeAsync`, fakeAsync(() => {
        spyOn(homeService, 'getMessage')
            .and.returnValues(
                of('FAKE MESSAGE 1'),
                timer(2000, scheduler).pipe(take(1), map(x => 'FAKE MESSAGE 2'))
            );

            fixture.detectChanges();

            const el = de.query(By.css('h1')).nativeElement;

            expect(el.innerText).toEqual('FAKE MESSAGE 1');

            const button = fixture.debugElement.query(By.css('button')).nativeElement;
            button.click();

            fixture.detectChanges();

            tick(3000);

            fixture.detectChanges();

            expect(el.innerText).toEqual('FAKE MESSAGE 2');
        })
    );

    it(`should get next message on click - with async`, async(() => {
        spyOn(homeService, 'getMessage')
            .and.returnValues(
            of('FAKE MESSAGE 1'),
            timer(2000, scheduler).pipe(take(1), map(x => 'FAKE MESSAGE 2'))
            );

            fixture.detectChanges();

            const el = de.query(By.css('h1')).nativeElement;

            expect(el.innerText).toEqual('FAKE MESSAGE 1');

            const button = de.query(By.css('button')).nativeElement;
            button.click();

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(el.innerText).toEqual('FAKE MESSAGE 2');
            });
        })
    );

    it('should get next message on click - with done', (done) => {
        const spy = spyOn(homeService, 'getMessage')
            .and.returnValues(
                of('FAKE MESSAGE 1'),
                timer(2000, scheduler).pipe(take(1), map(x => 'FAKE MESSAGE 2'))
            );

            fixture.detectChanges();
            const el = de.query(By.css('h1')).nativeElement;

            expect(el.innerText).toEqual('FAKE MESSAGE 1');

            const button = de.query(By.css('button')).nativeElement;
            button.click();

            spy.calls.mostRecent().returnValue
                .subscribe(() => {
                    fixture.detectChanges();
                    expect(el.innerText).toEqual('FAKE MESSAGE 2');
                    done();
                });
    });
});
