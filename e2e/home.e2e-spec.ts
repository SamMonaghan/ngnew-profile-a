import { HomePage } from './home.po';
import { screenshot } from './util/screenshot.util';


describe('Page: Home Page', () => {

    it(`should have a new message on button click`, async() => {
        HomePage.navigateTo();

        const firstMessage = await HomePage.getMessageText();
        screenshot('first message');

        HomePage.getNextMessage();

        const secondMessage = await HomePage.getMessageText();
        screenshot('second message');

        expect(firstMessage).not.toEqual(secondMessage);
    });
});
