import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddnewComponent } from './addnew/addnew.component';
import { AddressComponent } from './address/address.component';
import { AdminaccountComponent } from './adminaccount/adminaccount.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { BagComponent } from './bag/bag.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { SalesinfoComponent } from './salesinfo/salesinfo.component';
import { StoreComponent } from './store/store.component';
import { ThanksComponent } from './thanks/thanks.component';
import { UpdateComponent } from './update/update.component';
import { UseraccountComponent } from './useraccount/useraccount.component';

import { UserdashComponent } from './userdash/userdash.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

   { path: 'home', component: HomeComponent },
  { path: 'thanks', component: ThanksComponent },



  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'userdash/:username', component: UserdashComponent },
 
  { path: 'useraccount/:username', component: UseraccountComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path :'wishlist' ,component:WishlistComponent  },
      { path: 'myorders', component: MyordersComponent },
      { path: 'profile', component: UserdashComponent },
      
      {
        path: 'cart',
        component: CartComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'bag' },
          
          { path: 'address', component: AddressComponent },
          { path: 'payment',component: PaymentComponent },

         


          { path: 'bag', component: BagComponent },
        ],
      },

      { path: 'home', component: HomeComponent },
      { path: 'store', component: StoreComponent },
    ],
  },
  { path: 'account', component: AccountComponent },

  { path: 'store/:id', component: StoreComponent },

  {
    path: 'adminaccount/:username',
    component: AdminaccountComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'adminprofile', component: AdminprofileComponent },
      { path: 'salesinfo', component: SalesinfoComponent },
      { path: 'addnew', component: AddnewComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
  { path: 'adminprofile', component: AdminprofileComponent },

  {
    path: 'admindash/:username',
    component: AdmindashComponent,
    children: [
      { path: 'adminprofile', component: AdminprofileComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'salesinfo', component: SalesinfoComponent },
      { path: 'addnew', component: AddnewComponent },

      { path: 'store', component: StoreComponent },
    ],
  },
  { path: 'store', component: StoreComponent },

  { path: '**', redirectTo: 'pagenotfound' },
];

@NgModule({
  // path mounting strategy
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
