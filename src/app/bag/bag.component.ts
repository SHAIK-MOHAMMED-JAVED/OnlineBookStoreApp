import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css'],
})
export class BagComponent implements OnInit {
  user = { username: '' };
  cart: any;

  sum: number = 0;
  totalPrice: number;
  cartIsEmpty:boolean;
  limitofPurhcase:boolean=false;

  deliveryCharge: number;
  constructor(private ds: DataService, private router: Router) {}

  placeOrder() {
    this.router.navigateByUrl('useraccount/:username/cart/address');
  }

  removeItemfromCart(item) {
    this.ds.removeFromCart(item).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.user.username = localStorage.getItem('username');
    console.log(this.user);

    this.ds.getCart(this.user).subscribe(
      (res) => {
        this.cart = res['message'];

        if(this.cart.length==0){
        this.cartIsEmpty=false
        }
        
        else{
          this.cartIsEmpty=true
        }

        for (let i = 0; i < this.cart.length; i++)
          this.sum = Math.round(this.sum + this.cart[i].prod_price);

        if (this.sum < 1000) {
          this.limitofPurhcase=true
         this.deliveryCharge = 50;
         this.totalPrice = this.deliveryCharge + this.sum;
         
        }
        else {
          this.limitofPurhcase=false
          this.deliveryCharge = 100;
          this.totalPrice = this.deliveryCharge + this.sum;
      

      
        }
      },
      (err) => {}
    );
  }
}
