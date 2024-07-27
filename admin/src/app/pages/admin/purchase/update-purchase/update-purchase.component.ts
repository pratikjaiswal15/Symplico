import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../../../../services/purchase.service'
import { FormBuilder ,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-update-purchase',
  templateUrl: './update-purchase.component.html',
  styleUrls: ['./update-purchase.component.scss']
})
export class UpdatePurchaseComponent implements OnInit {


  
  data: any;
  myid = null;
  date;
  product;
  editable;


  get product_name() {
    return this.updatePform.get('product_name')
   }

   set product_name(n) {
    this.updatePform.controls['product_name'].setValue(n)
   }

   get quantity() {
     return this.updatePform.get('quantity')
   }

   set quantity(n) {
    this.updatePform.controls['quantity'].setValue(n)
   }


   get vendor_name() {
    return this.updatePform.get('vendor_name')
  }

  set vendor_name(n) {
   this.updatePform.controls['vendor_name'].setValue(n)
  }


  constructor(private route: ActivatedRoute, private router: Router, public purchaseService :PurchaseService ,private fb:FormBuilder,private toastr: ToastrService) { 

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        this.myid = this.data.serial_no
        this.product_name = this.data.product_name
        this.quantity = this.data.quantity
        this.vendor_name = this.data.vendor_name
        
      }
    });

  }

  updatePform = this.fb.group({
    product_name : ['', [Validators.required, Validators.minLength(3)] ],
    quantity : [''],
    vendor_name : ['', [Validators.required, Validators.minLength(3)] ],
    date : new Date().toISOString(),


  })

  update(){
    let purchase = {
      product_name : this.product_name.value,
      quantity : this.quantity.value,
      vendor_name : this.vendor_name.value,
      date : new Date().toISOString(),

    } 
    console.log(purchase)
  }

  ngOnInit() {

    this.date = new Date();

  }

}
