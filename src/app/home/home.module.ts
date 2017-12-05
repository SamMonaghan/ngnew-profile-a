import { MaterialModule } from '../lib/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
