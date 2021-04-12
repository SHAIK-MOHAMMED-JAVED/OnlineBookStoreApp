import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})


export class UserdashComponent implements OnInit,OnDestroy {
  

  userprofile
  userObj={username:""}
  subscription:Subscription;


  constructor(private ar:ActivatedRoute,private ds:DataService ) { }




  ngOnInit(): void {

    this.userObj.username=localStorage.getItem('username')
    console.log(this.userObj)
    this.subscription=this.ds.getprofile(this.userObj).subscribe(

  res=>{
    this.userprofile=res['message']
    console.log("profile",this.userprofile.username,this.userprofile.email)
  },
  err=>{}

)


    // this.subscription=this.ar.paramMap.subscribe(
      
      
    //   data=>
    //   {
    //     this.username=data['params'].username

    //     console.log(this.username)

    //   })






      
  }



  // changePassword(userpass){

  //   console.log("ttt",userpass)
  //   this.ds.changepassword(userpass).subscribe(

  //     res=>{
  //       alert('')
  //     },
  //     err=>{}
  //   )
  // }











  ngOnDestroy(){


    this.subscription.unsubscribe()
  }



}
