import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorouselComponent } from './corousel/corousel.component';
import { StoreComponent } from './store/store.component';
import { PopularComponent } from './popular/popular.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserdashComponent } from './userdash/userdash.component';
import { AccountComponent } from './account/account.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AdventureComponent } from './adventure/adventure.component';
import { ProductsComponent } from './products/products.component';
import { AddnewComponent } from './addnew/addnew.component';
import { SalesinfoComponent } from './salesinfo/salesinfo.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import {AuthorizationService } from './authorization.service';
import { BiographyComponent } from './biography/biography.component';
import { AdminlogComponent } from './adminlog/adminlog.component';
import { AdminaccountComponent } from './adminaccount/adminaccount.component';
import { UpdateComponent } from './update/update.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BagComponent } from './bag/bag.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { ThanksComponent } from './thanks/thanks.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyordersComponent } from './myorders/myorders.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    PagenotfoundComponent,
    CorouselComponent,
    StoreComponent,
    PopularComponent,
    UserdashComponent,
    AccountComponent,
    AdmindashComponent,
    AdventureComponent,
    ProductsComponent,
    AddnewComponent,
    SalesinfoComponent,
    AdminprofileComponent,
    BiographyComponent,
    AdminlogComponent,
    AdminaccountComponent,
    UpdateComponent,
    UseraccountComponent,
    CategoriesComponent,
    CartComponent,
    BagComponent,
    AddressComponent,
    PaymentComponent,
    ThanksComponent,
    WishlistComponent,
    MyordersComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
