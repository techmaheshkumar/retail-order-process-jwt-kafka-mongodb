import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isLoggedInUser, getUser } from 'src/app/shared/util/storage.util';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public enableAdmin = false;
  public pushRightClass!: string;
  name = '';
  isLoggedIn = false;
  roleId = 0;
  public cartSize = 0;
  constructor(public router: Router, public service: UserService) {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }

    if (getUser()) {
      const user: User = JSON.parse(JSON.stringify(getUser()));
      this.service.currentUser$.next(user);
    }
    this.hasAdminAccess();
  }

  ngOnInit(): void {
    this.pushRightClass = 'push-right';
    const userName = localStorage.getItem('name');
    this.name = userName !== null ? userName.toString() : '';
    const role = localStorage.getItem('roleId');
    this.roleId = role !== null ? +role : 0;
  }

  hasAdminAccess() {
    const currentUser = this.service.currentUser$.value;
    this.service.currentUser$.subscribe(
      (data: User | null) => {
        if (data) {
          const data1 = localStorage.getItem('roleName')
          // let temp =Object.assign(new User(), data);
          //console.log(temp)
          if (data1) {
            if (isLoggedInUser() && currentUser && data1 === "User")
              this.enableAdmin = true;
          }

        }

      }
    )

  }

  isToggled(): boolean {
    const domElement = document.querySelector('body');
    const dom: Element = null !== domElement ? domElement : new Element();
    return dom.classList.contains(this.pushRightClass);
  }

  onLoggedout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
