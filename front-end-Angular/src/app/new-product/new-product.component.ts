import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  image_FileList: any = [];
  file: any;
  status: any;
  constructor(
    private config: ConfigService,
    public router:Router,
  ) { }

  data = {file:'',  product_name: '', product_price: '',  product_sku: ''};

  ngOnInit(): void {
  }


 

  getImage(event: any) {
    this.image_FileList = event.target.files;
  }

  addProduct(data:any) {

    const sformData = new FormData();

    if (this.image_FileList.length > 0) {
      let file: File = this.image_FileList[0];
      sformData.append('file', file, file.name);
   
    }
    sformData.append('product_name', data.product_name);

    sformData.append('product_price', data.product_price);
   
    sformData.append('product_sku', data.product_sku);

    this.config.post("add-product", sformData).then((response: any) => {
      if(response.status){
        
        this.router.navigateByUrl('/products');
       }
       else{

     
       }
    })
  }


  onSubmit() {
    const sformData = new FormData();

    if (this.image_FileList.length > 0) {
      let product_image: File = this.image_FileList[0];
      sformData.append('product_image', product_image, product_image.name);
      console.log(product_image)
    }

  
    sformData.append('product_price', this.data.product_price);
   
    sformData.append('product_sku', this.data.product_sku);
  
      this.config.post("add-product", sformData).then((response: any) => {
        console.log(response);

        this.status = response.status;
        if(response.status){
        
          
          this.router.navigateByUrl('/list');
         }
         else{
       
         }
      })
    }
}

