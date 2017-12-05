import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../lib/material/material.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './user.service';

import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([ UserEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 30
    })
  ],
  exports: [UserProfileComponent],
  declarations: [UserProfileComponent],
  providers: [UserService]
})
export class UserModule { }
