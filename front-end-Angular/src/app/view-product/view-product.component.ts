import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: any;
  message: string;

  product_name: string;
  product_sku: string;
  product_price: number;
  product_image: any;
  products: any[];
  constructor(private config: ConfigService,
    public router:Router,
    // private toast: ToastService,
    private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct() {
    this.config.post("get-product-details-by-id", {id:this._Activatedroute.snapshot.params['id'] }).then((response: any) => {
   
      this.product = response.data[0];
      this.product_name=response.data[0].product_name;
      this.product_sku=response.data[0].product_sku;
      this.product_price=response.data[0].product_price;
      this.product_image=response.data[0].product_image.url;

      this.products = response.data[0].product_imgs
      if(this.product.length===0){
        
        this.message='no data found'
      }

    }, (err) => {
      console.log(err);
    });
  }

  onAdd(){
    console.log(this._Activatedroute.snapshot.params['id']);
    this.config.post("add-to-cart", {productId:this._Activatedroute.snapshot.params['id'] }).then((response: any) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    }
    
    );
  }
}
