import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from 'src/app/shared/util/storage.util';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/model/user';
import { ProductService } from 'src/app/service/product.service';

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
  constructor(public router: Router, public service: UserService, private prodService: ProductService) {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
    if (getUser()) {
      const user: User = JSON.parse(JSON.stringify(getUser()));
      this.service.currentUser$.next(user);
    }
  }

  ngOnInit(): void {
    this.pushRightClass = 'push-right';
    const userName = localStorage.getItem('name');
    this.name = userName !== null ? userName.toString() : '';
    const role = localStorage.getItem('roleId');
    this.roleId = role !== null ? +role : 0;
    this.prodService.cart$.subscribe((products) => {
      if (products) {
        this.cartSize = products.length;
      } else {
        this.cartSize = 0;
      }
    });
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
