import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private ds:DataService) { }

  wishlist:any
  userObj={username:""}
  ngOnInit(): void {

    this.userObj.username=localStorage.getItem('username')


    this.ds.getproductsFromWishlist(this.userObj).subscribe(



      res=>{

      this.wishlist=res['message']
      console.log("in wishlist",this.wishlist)

      },
      err=>{

      }
    )
  }

  deleteFromWishlist(wish){

    this.ds.deleteProductFromWishlist(wish).subscribe(

      res=>{
        alert(res['message'])
      },
      err=>{}
    )

    window.location.reload();

  }
 

  moveToCartFromWishlist(book){

    this.ds.moveToCartFromWishlist(book).subscribe(

      res=>{
        alert(res['message'])
      },
      err=>{}
    )

  }

}
