import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {

  image_FileList: any = [];
  product : any;

  product_id: any;
  constructor(
    public config : ConfigService,
    public _Activatedroute: ActivatedRoute, 
  ) { }
  uploadProducImage=new FormData();
  ngOnInit(): void {
    this.product_id = this._Activatedroute.snapshot.params['id'];
  }


  getImages(event: any) {
    this.image_FileList = event.target.files;
   // console.log(this.image_FileList);
  }

  onSubmit(){
    const sformData = new FormData();
    if (this.image_FileList.length > 0) {
      for (let i = 0; i < this.image_FileList.length; i++) {
        let file: File = this.image_FileList[i];
        sformData.append('file', file, file.name);
    }
    }
    //sformData.append('product_image', this.image_FileList);
    sformData.append('product_id', this.product_id);
    this.config.post('add-product-image', sformData).then((response: any) => {
      if(response.status){
     
  
       }
       else{
      
       }
  
     
    });
  }

}
