import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HomeService {

  private messages = [
    'It\'s a me, Waluigi.',
    'Bowser did nothing wrong',
    'Luigi...who?',
    'Soylent green is mushroom people!'
  ];

  private index = 0;

  constructor() { }

  getMessage() {
    const currentMessage = this.messages[this.index++];
    if (this.index > this.messages.length - 1) {
      this.index = 0;
    }

    return of(currentMessage);
  }
}
