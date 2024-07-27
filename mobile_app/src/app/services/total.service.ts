import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  total :any;
  address_id : any;
  constructor() { }

  get_grandTotal(){
    return this.total
  }

  set_grandTotal(value){
    this.total = value
    return this.total
  }

  getAddress_id (){
    return this.address_id
  }

  set_Addressid(value){
    this.address_id = value
    console.log("is set in servie " + this.address_id)
    return this.address_id
  }

}
