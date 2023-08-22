import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

import { ViewProductComponent } from './view-product/view-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { UserCartComponent } from './user-cart/user-cart.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'add', component: NewProductComponent },
  { path: 'add-images/:id', component: AddImagesComponent },
  { path: 'products/edit/:id', component: UpdateProductComponent },

  { path: 'products/:id', component: ViewProductComponent },
  { path: 'cart', component: UserCartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
