import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  cart: any; // Type according to your cart data structure

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.config.get('cart').then((response: any) => {
      this.cart = response.cart;
      console.log(this.cart);
    }, (err) => {
      console.log(err);
    });
    
  }
  removeFromCart(productId: string) {
    this.config.post('delete-from-cart/',{productId:productId}).then((response: any) => {
      console.log(productId);

      this.getCart();
    }, (err) => {
      console.log(err);
    });
  }
}
