import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutRoutes } from './layout.routes';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ProductsComponent } from './products/products.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false }),
        MatCarouselModule.forRoot(),
        LayoutRoutes
    ],
    declarations: [
        LayoutComponent,
        NavbarComponent,
        HomeComponent,
        ProductDisplayComponent,
        ProductsComponent,
        CartDetailComponent,
        MyOrdersComponent
    ],
    providers: [],
    entryComponents: [
    ]
})
export class LayoutModule { }
