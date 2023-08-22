import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[]; // Declare an array to store the products
 
  totalProducts: number;
  message: string;
  cart: any;
  cartLength: any;

  constructor(private config: ConfigService,
    public router:Router,
    // private toast: ToastService,
    private _Activatedroute: ActivatedRoute,
    ) {} // Inject the ProductService

  ngOnInit() {
   
    this.getProducts(); // Call the method to fetch the products
    this.getCart()
  }

  getProducts() {
    this.config.post("get-all-product", { }).then((response: any) => {
    this.products = [];
      this.products = response.data;

      if(this.products.length===0){
        this.totalProducts = 0;
        this.message='no data found'
      }
      // this.totalProducts = response.productcount;
    }, (err) => {
      console.log(err);
    });
  }
  onDelete(prod: any) {
    this.config.put("delete-product", { id:prod._id}).then((response: any) => {
      this.getProducts();
      console.log(response.message);
    }, (err) => {
      console.log(err);
    });
  }
  onAdd(){
    this.router.navigateByUrl('add');
  }

  onEdit(prod:any){
    this.router.navigateByUrl('products/edit/'+prod._id);
  }
  addImages(prod:any){
    this.router.navigateByUrl('add-images/'+prod._id);
  }
  onView(prod: any) {
    this.router.navigateByUrl('products/'+prod._id);
  }

  goToCart(){
    this.router.navigateByUrl('cart');
  }
 

  getCart() {
    
    this.config.get('cart').then((response: any) => {
      this.cart = response.cart;
      this.cartLength=response.cart.items.length
      console.log(this.cart);
    }, (err) => {
      console.log(err);
    });


   
    
  }

  addtoCart(prod:any){
    this.config.post("add-to-cart", {productId:prod._id}).then((response: any) => {
      console.log(response);
      
      this.getCart()
    }, (err) => {
      console.log(err);
    }
    
    );
  }

    }
   
