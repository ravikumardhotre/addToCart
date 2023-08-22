import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  base_url = "http://localhost:3000/";
  
  constructor(private http: HttpClient,
  ) { }

  get(url: string) {
  
    return new Promise(resolve => {
      this.http.get<any>(this.base_url + url).subscribe((data: any) => {
        //let d = JSON.parse(data);
        resolve(data);
      }, (err) => {
        //resolve(err);
        console.log(err);
      });
    });
  }


  post(url: string, params: any) {
   
    return new Promise(resolve => {
      this.http.post<any>(this.base_url + url, params).subscribe((data: any) => {
        //let d = JSON.parse(data);
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }


  put(url: string, params: any) {
  
    return new Promise(resolve => {
      this.http.put<any>(this.base_url + url, params, ).subscribe((data: any) => {
        //let d = JSON.parse(data);
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }


}