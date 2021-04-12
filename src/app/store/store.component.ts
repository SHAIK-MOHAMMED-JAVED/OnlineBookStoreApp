import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  subscription: Subscription;
  clickedCard: number;
  constructor(private ar: ActivatedRoute, private ds: DataService) {}

  booksAvailable: Array<any>;
  filteredBooks: Array<any>;

  title:string;


  clickedCart(book){

  let status = localStorage.getItem('username') 
  

  if(status){
  
   book.userAdded=status

  //  console.log(book)

    this.ds.addtoCart(book).subscribe(


      res=>{

 
        console.log(res['message'])


        if(res['message']=="product added to cart"){

          alert("product added successfully")

        }

         else{


          alert("Product is  already exist in cart")
         }
      },

      err=>{}
    )
 

  }
  else{

    alert('Please Register ')
  }

  }

  //MOVE TO WISHLIST

  clickedWishlist(book){

    let status = localStorage.getItem('username') 
    
  
    if(status){
    
     book.userAdded=status
  
    //  console.log(book)
  
      this.ds.moveToWishlistFromStore(book).subscribe(
  
  
        res=>{
  
   
          console.log(res['message'])
  
  
          if(res['message']=="product added to wishlist"){
  
            alert("product added to WishList")
  
          }
  
           else{
  
  
            alert("Product is  already exist in wishlist")
           }
        },
  
        err=>{}
      )
   
  
    }
    else{
  
      alert('Please Register ')
    }
  
    }

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.clickedCard = data['params'].id;

      console.log("clicked",this.clickedCard)

     
    });

    this.clickedCard=+(this.clickedCard)
    this.ds.getAllProductstoUsers().subscribe(
      (res) => {
        this.booksAvailable = res['message'];

        console.log(this.booksAvailable)

      
        switch (this.clickedCard) {
          case 1: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              
           
              return book.type=='Adventure';

            }); 
            
          

            console.log(">>>>>> 1")
            console.log(this.filteredBooks)
            break;
          }

           
          case 2: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              

              return book.type == 'Biography';
            });


            console.log(">>>>>> 2")
            console.log(this.filteredBooks)

            break;
          }




          case 3: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              

              return book.type == 'Business';


            });
            break;
          }





          case 4: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              

              return book.type == 'Computing';
            });

            break;
          }





          case 5: {
            this.filteredBooks = this.booksAvailable.filter((book) => {

              return book.type == 'Computing';
            });

            break;
          }





          case 6: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
             

              return  book.type == 'Fiction';
            });

            break;
          }





          case 7: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              
              return book.type == 'Humour';

            });

            break;
          }
              
          
          case 8: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              
              return book.type == 'Politics';

            });

            break;
          }


          
          case 9: {
            this.filteredBooks = this.booksAvailable.filter((book) => {

              return   book.type == 'Religion';

            });

            break;
          }

          case 10: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
            
              return   book.type == 'Romance';

            });

            break;
          }


          case 11: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
          

              return    book.type == 'Science';
            });
           

            break;
          }








        }
      },

      (err) => {}
    );
  }
}
