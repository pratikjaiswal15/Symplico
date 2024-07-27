import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

 url : string;
 
  constructor() {
    this.url = 'http://192.168.1.8:3000/'
   }
}
