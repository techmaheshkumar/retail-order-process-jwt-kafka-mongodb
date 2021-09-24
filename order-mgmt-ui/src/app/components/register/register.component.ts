import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import SnackBar from 'src/app/shared/util/snack-bar';
import { Role } from 'src/app/shared/model/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  user!: User;
  imgFile: any;

  constructor(private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router,
              public snackBar: MatSnackBar,
              private service: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  onImgFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imgFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill the required fields', 'Ok', SnackBar.getSnackBarConfig());
      return;
    }
    this.spinner.show();
    const formData: FormData = new FormData();
    this.user = this.registerForm.value;
    const role = new Role();
    role.id = 2;
    this.user.role = role;

    const userData = JSON.stringify(this.user);
    formData.append('user', userData);
    this.service.create(formData).subscribe(result => {
      if (result.status === 200) {
        this.spinner.hide();
        this.snackBar.open('User created Successfully', 'Ok', SnackBar.getSnackBarConfig());
        this.router.navigate(['/login']);
      } else {
        this.spinner.hide();
        this.snackBar.open('User Creation Failed', 'Ok', SnackBar.getSnackBarConfig());
        console.log('Something went wrong !', result.message);
      }
    }, err => {
      this.spinner.hide();
      console.log('Something went wrong !', err);
    });
  }

}
