import { Component, OnInit, OnDestroy, } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { VendorService } from '../../../services/vendor.service';
import { FormBuilder ,Validators, FormArray,  FormGroup } from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { VerifySellerComponent } from './verify-seller/verify-seller.component';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { RequireMatch as RequireMatch } from './auto-complete-validators';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {


  seller_id;
  
  check;
  
  productList$: Observable<any>[] = [];
  purchaseform: FormGroup;
  results;
  subscribe1 :  Subscription
  subscribe2 :  Subscription
  subscribe3: Subscription;


  get product() {
    return this.purchaseform.get("product") as FormArray;
  }

  get vendor_mobile(){
    return this.purchaseform.get('vendor_mobile')
  }

  
  get product_name() {
    return this.purchaseform.get('product').value[0].product_name
   }

   set product_name(u) {
    this.purchaseform.controls['product'].value[0].setValue(u)
 }


  constructor(public vendorService : VendorService, public productService : ProductService,private fb:FormBuilder,
  public dialog: MatDialog  ) { 

  }

  addProductGroup(index) {
    //we use an auxiliar const
    const group = this.fb.group({
      product_name: ["", [Validators.required, RequireMatch ]] ,
      product_quantity: ["",[Validators.required, Validators.pattern("^[0-9]*$")]],
      product_Buyingprice: ["",[Validators.required, Validators.pattern("^[0-9]*$")]]
    });

    //See how the observables will ve valueChange of the "product_name"
    //of this formGroup, using a pipe and switchMap

    this.productList$[index] = group.get("product_name").valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.productService.search_Products(value))
    );


    //finally, we return the group
    return group;
  }
  addproduct() {
    this.product.push(this.addProductGroup(this.product.length));
  }

  remove_product(index) {
    return this.product.removeAt(index);
  }

  ngOnInit() {
    this.purchaseform = this.fb.group({
      vendor_mobile: ["",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
      product: this.fb.array([this.addProductGroup(0)])
    });
  }

  
  verify_vendor() {
    console.log(this.vendor_mobile.value)
    this.subscribe1 = this.vendorService.SellerFormMobile(this.vendor_mobile.value).subscribe(data => {
      console.log(data)

      this.Seller_Dialog(data)
    })
  

  }


  Seller_Dialog(data): void {
    
    console.log(data.name)
    const dialogRef = this.dialog.open(VerifySellerComponent,  {
      width: '500px',
      data: data,
      disableClose: true
    });

   this.subscribe2= dialogRef.afterClosed().subscribe(result => {

      console.log(result)
      this.seller_id = result
      console.log('The dialog was closed');
    });
  }

 

  displayFn(product): string {

    return product? product.name: product;
  }
  

  purchase(value) {
  console.log(value)
  
  if(this.seller_id) {
    this.purchase_Dialog(value, this.seller_id)
    
  }
  else {
    alert ("Seller not Selected.")
  }
}



purchase_Dialog(data, seller_id): void {
    
  const dialogRef = this.dialog.open(ConfirmDialogComponent,  {
    width: '500px',
    data: {data, seller_id},
    disableClose: true
  });


 this.subscribe3=  dialogRef.afterClosed().subscribe(result => {

    console.log(result)
    if(result == true){
      this.purchaseform.reset()
    }

    else {
      alert("Purchase cancled!")

    }
   
    console.log('The dialog was closed');
  });
}  
  
ngOnDestroy(){

}
}

