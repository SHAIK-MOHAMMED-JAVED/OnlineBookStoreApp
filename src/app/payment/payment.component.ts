import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parse } from 'dotenv/types';
import { DataService } from '../data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private ds: DataService , private router:Router) {}

  total;
  str:any
  deliveryCharge;
  sum;
  bool;
  otp:number
  incorrectOtp:boolean=false
  validity: boolean = false;
  savedCards:any
  displayAddCard:boolean=true
  cardLimitReached: boolean = false;
  cardDetails = [{ username: '', card: '',displayName:''  }];
  otpReceived:boolean=false;
  orders=[{selectedAddress:"",orderBy:"",status:"" }]

  cardIndex={index:'',username:'',cardObj:[]}


  cardSelected:boolean=false
  selectedCardFromRadio:any
  // addAddress(ref) {
  //   console.log(ref.status);
  //   if (ref.status == 'VALID') {
  //     console.log(ref.value);
  //     this.validity = true;
  //    }
    
  //   else {
  //     this.validity = false;
  //   }
  // }


  selectedCard(card){
    
     this.cardSelected=true
      

     this.selectedCardFromRadio= this.cardSelected



  }

  deleteCard(deletedIndex){

    this.cardIndex.index=deletedIndex
    this.cardIndex.username=localStorage.getItem('username')

      this.savedCards.splice(deletedIndex,1)  

    this.cardIndex.cardObj= this.savedCards
 console.log(this.cardIndex)

      this.ds.deleteCard(this.cardIndex).subscribe(


      res=>{
       
          console.log(res['message'])
        
      },
      err=>{



      }
    )


    
 window.location.reload()


     

    

  }


  makePayment(){

    let user = {username:localStorage.getItem('username')}

    // console.log(user)
 


    this.ds.makePaymentFinal(user).subscribe(


      res=>{

      this.otp=res['message']

      this.otpReceived=true
      console.log(this.otp)
     

      },
    err=>{}
    )



  }


  confirmed:boolean=true
  confirmOtp(formOtp){
    let user = {username:localStorage.getItem('username')}

    let confirmOtps=formOtp.value.otp
    
  if(this.otp==confirmOtps){

   
    this.router.navigateByUrl('thanks')
     

    this.orders[0].status="success"
    this.orders[0].orderBy=localStorage.getItem('username')

   
    
     let receivedAddress= this.ds.receiveFinalAddress()
        this.orders[0].selectedAddress=receivedAddress

     this.ds.makePaymentFinalStep(this.orders).subscribe(
      res=>{


        // orders list  of user 
        // admin profile sales


           

         
          

      },
      err=>{

      }
    )

}
else{

  this.orders[0].status="failed"
  this.orders[0].orderBy=localStorage.getItem('username')


       this.incorrectOtp=true
}
    
    

  }
  cardSave(ref) {
    let cardObj = ref.value;

    let user = localStorage.getItem('username');

    this.cardDetails[0].username = user;
    this.cardDetails[0].card = cardObj;
  
       

    let str = cardObj.cHname +'-'+parseInt(cardObj.cNumber)%10000
  
    this.cardDetails[0].displayName=str
      
   

 

    console.log(this.cardDetails)
    this.ds.cardSave(this.cardDetails).subscribe(
      (res) => {
        if (res['message'] == 'Card Added') {
          this.cardLimitReached = false;

        
        } else {
          
          this.cardLimitReached = true;
        }
      },
      (err) => {}
    );

    window.location.reload()
  }

  ngOnInit(): void {
    let user = localStorage.getItem('username');

    this.cardDetails[0].username = user;

 
    this.ds.getCards(this.cardDetails).subscribe(
      (res) => {
        this.savedCards = res['message'];
        console.log("res",this.savedCards)


        
        if(this.savedCards.length<=2)
        {

          this.displayAddCard=true
        }
        else{

          
          this.displayAddCard=false
        }

       
      },
      (err) => {}
    );
  }
}