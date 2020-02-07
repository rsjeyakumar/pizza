import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../../services/food-cart.service';
import Swal from 'sweetalert2';
import {MessageService} from 'primeng/api';

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
    public foodService: FoodCartService,
    private messageService: MessageService,
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

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure want to add favourite?', detail:'Confirm to proceed'});
  }
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  ngOnInit() {
  }

}
