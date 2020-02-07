import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../../services/food-cart.service';
import Swal from 'sweetalert2';

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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) { }

  showAllItems() {
    this.allItems = true;
    this.favouriteItems = false;
  }

  showFavourites() {
    this.allItems = false;
    this.favouriteItems = true;
  }

  getAllItems() {
    this.loader = true;
    this.foodService.getAllItems().subscribe(res => {
      console.log(res);
      this.loader = false;
      this.allItemList = res.itemList;
    },
      error => {
        this.loader = false;
      });
  }

  ngOnInit() {
  }

}
