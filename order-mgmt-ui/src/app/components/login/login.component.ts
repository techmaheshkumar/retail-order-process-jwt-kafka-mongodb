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

  constructor(private router: Router,
              private formBuilder: FormBuilder, private service: UserService, 
              private spinner: NgxSpinnerService) { }

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
      username: this.loginForm.controls.txtEmail.value,
      password: this.loginForm.controls.txtPwd.value
    };
    this.spinner.show();
    this.service.login(payload).subscribe(result => {
      if (result.status === 200) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('name', result.data.username);
        localStorage.setItem('id', result.data.id);
        localStorage.setItem('user', JSON.stringify(result.data));
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
