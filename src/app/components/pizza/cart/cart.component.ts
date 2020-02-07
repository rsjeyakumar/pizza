import { Component, OnInit } from '@angular/core';
import { ViewItems, ViewItemsRes, OrderItemList, OrdersReq } from '../../../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  counter = 0;
  cartItems = [];
  sessionCart;
  consolidateAmt = 0;
  constructor() { }

  ngOnInit() {
    this.cartItems = JSON.parse(sessionStorage.getItem('sessionCart'));
    this.subTotal();
  }
  subTotal() {
    this.consolidateAmt = this.cartItems.reduce(
      (totalValue, currentvalue) => {
        return totalValue + (currentvalue.quantity * currentvalue.price);
      }, 0
    );
  }

  placeOrder() {
    const postObj = {
      itemList: JSON.parse(JSON.stringify(this.cartItems)),
      totalPrice: this.consolidateAmt
    };
    const itemList = postObj.itemList.map((item) => {
      delete item.itemName;
      delete item.price;
      delete item.favourite;
      return item;
    });
  }

  removeItem(pizzaid) {
    const obj = this.cartItems.findIndex(o => o.itemId === pizzaid);
    if (obj !== -1) {
      this.cartItems.splice(obj, 1);
      this.subTotal();
    }
  }

}
