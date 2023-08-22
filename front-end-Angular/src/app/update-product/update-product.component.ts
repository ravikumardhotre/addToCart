import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: any;
  message: string;
  updateProduct=new FormGroup({
    product_name:new FormControl(''),
    product_sku:new FormControl(''),
    product_price:new FormControl('')
  })
  
    
  
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
          console.log(this.product);
          this.updateProduct=new FormGroup({
            product_name:new FormControl(this.product['product_name']),
            product_sku:new FormControl(this.product['product_sku']),
            product_price:new FormControl(this.product['product_price']),
            product_id:new FormControl(this.product['_id'])
          })
          
          
          if(this.product.length===0){
            
            this.message='no data found'
          }
    
        }, (err) => {
          console.log(err);
        });
      }
  
  
      updateData(){
        this.config.put("update-product",this.updateProduct.value).then((response: any) => {
        
          console.log(response.message);
          this.router.navigateByUrl('/products');

        }, (err) => {
          console.log(err);
        });
      }



  }
  