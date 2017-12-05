import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message = 'Something something, routing is cool.';

  constructor() { }

  ngOnInit() {
  }

}
