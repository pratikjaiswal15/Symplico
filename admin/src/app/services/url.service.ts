import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url = ''
  constructor() { 
    this.url = 'http://192.168.43.147:3000/'
  }
}
