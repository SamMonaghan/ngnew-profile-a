import { HomeComponent } from './home.component';

describe(`Component: HomeComponent Suite`, () => {
    let component: HomeComponent = null;

    beforeEach(() => {
        component = new HomeComponent();
    });

    it('check component loads', () => {
        expect(component.message).toEqual('Something something, routing is cool.');
    });

    it('add 1 + 1', () => {
        expect(1 + 1).toEqual(2);
        expect(1 + 2).toBe(3);
    });
});
