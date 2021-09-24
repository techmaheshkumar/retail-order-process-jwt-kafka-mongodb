import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalidLogin = false;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private formBuilder: FormBuilder, private service: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      txtEmail: [''],
      txtPwd: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      email: this.loginForm.controls.txtEmail.value,
      password: this.loginForm.controls.txtPwd.value
    };
    this.spinner.show();
    this.service.login(payload).subscribe(data => {
      if (data.status === 200) {
        localStorage.setItem('token', data.result.accessToken);
        localStorage.setItem('name', data.result.name);
        localStorage.setItem('roleName', data.result.role.name);
        localStorage.setItem('user', JSON.stringify(data.result));
        this.service.currentUser$.next(data.result);
        localStorage.setItem('id', data.result.id + '');
        localStorage.setItem('roleId', data.result.role.id + '');

        this.spinner.hide();
        this.router.navigate(['/home']);
      } else {
        this.spinner.hide();
        this.invalidLogin = true;
        console.log('invalid login');
      }
    }, error => {
      this.spinner.hide();
      console.log('something went wrong.');
    });
  }
}
