import { Component, OnInit } from '@angular/core';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';
import { ThemePalette } from '@angular/material/core';
import { Product } from 'src/app/shared/model/product';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/shared/model/cart';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slidesList = new Array<never>(1);
  public parentHeight = 'auto';
  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public hideArrows = true;
  public hideIndicators = true;
  public color: ThemePalette = 'accent';
  public maxWidth = 'auto';
  public maintainAspectRatio = true;
  public proportion = 25;
  public slideHeight = '200px';
  public slides = this.slidesList.length;
  public overlayColor = '#00000040';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation: Orientation = 'ltr';
  public log: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }


}
