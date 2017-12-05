import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message = 'Something something, routing is cool.';

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.homeService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

}
