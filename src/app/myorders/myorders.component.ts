import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  MyOrders=[]
  userObj={username:""}
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.userObj.username=localStorage.getItem('username')
    this.ds.getOrders(this.userObj).subscribe(
      res=>{
        this.MyOrders=res['message']
        // console.log("My Orders",res['message'])
        console.log("My Orders",this.MyOrders)
      },
      err=>{}
    )
  }

}
