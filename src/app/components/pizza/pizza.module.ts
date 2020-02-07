import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzaRoutingModule } from './pizza-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';

@NgModule({
  declarations: [HomeComponent, DetailComponent, CartComponent],
  imports: [
    CommonModule,
    PizzaRoutingModule,
    SharedModule,
    PrimengModule
  ]
})
export class PizzaModule { }
