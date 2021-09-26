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

  constructor(private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router,
              public snackBar: MatSnackBar,
              private service: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      txtUserName: [''],
      txtEmail: [''],
      txtPwd: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill the required fields', 'Ok', SnackBar.getSnackBarConfig());
      return;
    }
    this.spinner.show();
    const role = new Role();
    role.name = 'USER';
    const payload = {
      username: this.registerForm.controls.txtUserName.value,
      email: this.registerForm.controls.txtEmail.value,
      password: this.registerForm.controls.txtPwd.value,
      roles: [
        role
      ]
    };

    this.service.create(payload).subscribe(result => {
      if (result.status === 201) {
        this.spinner.hide();
        this.snackBar.open('User created Successfully', 'Ok', SnackBar.getSnackBarConfig());
        this.router.navigate(['/login']);
      } else {
        this.spinner.hide();
        this.snackBar.open(result.data, 'Ok', SnackBar.getSnackBarConfig());
        console.log('Something went wrong !', result.message);
      }
    }, err => {
      this.spinner.hide();
      console.log('Something went wrong !', err);
    });
  }

}
