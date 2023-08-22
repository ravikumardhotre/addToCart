import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewProductComponent } from './new-product/new-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { UserCartComponent } from './user-cart/user-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,

    ViewProductComponent,
   
    NewProductComponent,
    UpdateProductComponent,
    AddImagesComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule ,
    FormsModule,
    BrowserAnimationsModule ,
    ReactiveFormsModule,
   
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
