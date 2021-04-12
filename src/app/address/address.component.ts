import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { number } from 'joi';
import { DataService } from '../data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  cart: any;
  sum = 0;
  deliveryCharge = 50;
  total = 0;
  bool: boolean = false;
  addressList: any;
  addressLimit: boolean = true;
  updatedAddressList: any;
  ordersBetweenPayAddr: string=''
  
  selectedAddressFromList:number=-1;
  orders=[{selectedAddress:"",orderBy:"" }]
  




  user = { username: '', id: 0 };

  constructor(private ds: DataService, private router: Router) {}

  addAddress(ref) {
    let addObj = ref.value;

    addObj.username = localStorage.getItem('username');

    this.ds.addAddress(addObj).subscribe((res) => {
      if (res['message'] == 'Address limit reached Maximum') {
        alert(' address limit reached max');
      } else {
        alert('Address added ');
      }
    });
  }

  deleteAddress(i) {
    this.user.id = i;

    this.addressList.splice(i, 1);

    this.user.username=localStorage.getItem('username')
    this.updatedAddressList = this.addressList;
    this.updatedAddressList.userDeleted = this.user.username;
    // console.log(this.updatedAddressList)

    this.ds.deleteAddress(this.updatedAddressList).subscribe(
      (res) => {
        alert(res['message']);
      },
      (err) => {}
    );
  }



  selectedAddress(i){

    
  this.selectedAddressFromList=i
  this.orders[0].selectedAddress=i
  this.orders[0].orderBy=localStorage.getItem('username')
  
         



  }


  nextStep(){

    if(this.selectedAddressFromList==-1){
      alert("Please select the Delivery address")
    }

    else{



      this.ds.sendDatatoAddress(this.orders[0].selectedAddress);


      this.ds.selectedAddressSetup(this.orders).subscribe(

    
        res=>{

console.log('hey vishnu hey vishnu')



             
             

    
        },
        err=>{
          
        }
    
    
    
      )
       
       
      this.router.navigateByUrl('useraccount/:username/cart/payment')


    }
  }

  ngOnInit(): void {
    this.user.username = localStorage.getItem('username');

    this.ds.getAddress(this.user).subscribe(
      (res) => {
        this.addressList = res['message'];

        if (this.addressList.length >= 5) {
          this.addressLimit = false;
        } else {
          this.addressLimit = true;
        }
      },
      (err) => {}
    );

    this.ds.getCart(this.user).subscribe(
      (res) => {
        this.cart = res['message'];

        for (let i = 0; i < this.cart.length; i++)
        this.sum = Math.round(this.sum + this.cart[i].prod_price);

        if (this.sum > 1000) {
          this.bool = true;

          this.total = this.sum;
        } 
          else {
          this.bool = false;
          this.total = this.sum + this.deliveryCharge;
        }
      },
      (err) => {}
    );
  }
}
