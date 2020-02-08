import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../../services/food-cart.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loader = false;
  allItemList;
  favouriteItems = false;
  allItems = true;
  items;
  cartItems = [];
  addPreferences = {};
  customerid: number;
  mypreference;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService,
    private messageService: MessageService,
  ) { }

  showAllItems() {
    this.allItems = true;
    this.favouriteItems = false;
    this.getAllItems();
  }

  showFavourites() {
    this.allItems = false;
    this.favouriteItems = true;
    this.loader = true;
    this.foodService.viewPreference(this.customerid).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.mypreference = res;     

    },
      error => {
        this.loader = false;
      });
  }

  getAllItems() {
    this.loader = true;
    this.foodService.getAllItems().subscribe(res => {
      console.log(res);
      this.loader = false;
      this.allItemList = (res.length) ? res : res.itemDetails;
    },
      error => {
        this.loader = false;
      });
  }

  showConfirm(fav, item) {
    this.addPreferences = {
      itemId: item,
      preference: fav
    };
    this.messageService.clear();
    // alert(fav);
    if (fav) {
      this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure want to remove favourite?', detail: 'Confirm to proceed' });
    } else {
      this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure want to add favourite?', detail: 'Confirm to proceed' });
    }
  }
  onConfirm() {
    this.messageService.clear('c');
    this.foodService.addPreference(this.addPreferences, this.customerid).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.allItemList = res.itemDetails;
      this.getAllItems();
      Swal.fire(
        'Good job!',
        'Favourite Changed Successfully',
        'success'
      );
    },
      error => {
        this.loader = false;
      });
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  ngOnInit() {
    this.getAllItems();
    this.customerid = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
  }


  addToCart(item) {
    item.quantity = 1;
    this.cartItems.push(item);
    console.log(this.cartItems);
  }
  myCart() {
    sessionStorage.setItem('sessionCart', JSON.stringify(this.cartItems));
    this.router.navigate(['/pizza/cart']);

  }


}
