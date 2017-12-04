import { User } from '../models/user';
import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnChanges {

  userForm: FormGroup;
  loading = false;
  saving = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();

  }
  ngOnChanges() {
    this.createForm();

  }

  getUser(userId: number) {
    this.loading = true;
    this.userService.getUser(userId).subscribe(user => {
      this.userForm.patchValue(user);

    },
      error => {
        this.userForm.reset({ createUser: false });
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  revert() { this.ngOnChanges(); }

  createForm() {
    this.userForm = this.formBuilder.group({
      createUser: true,
      userId: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      displayName: null
    });
  }

  prepareUser(): User {
    const userModel = this.userForm.value;

    const saveUser: User = {
      userId: userModel.createUser ? 0 : userModel.userId,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      displayName: userModel.displayName
    };
    return saveUser;
  }

  onSubmit() {
    this.saving = true;
    const user = this.prepareUser();
    this.userService.saveUser(user).subscribe(apiUser => {
      if (apiUser) {
        const value = {
          ...apiUser,
          ...{ createUser: false }
        };
        this.userForm.patchValue(value);
      }
      this.saving = false;
    });
  }

}
