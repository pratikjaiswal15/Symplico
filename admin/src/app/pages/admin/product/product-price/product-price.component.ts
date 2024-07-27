import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';


@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnInit, OnDestroy {

  product_id : number;
  subscribe1 : Subscription;
  subscribe2 : Subscription;

  get fair() {
    return this.PriceForm.get('fair')
   }

   set fair(n) {
    this.PriceForm.controls['fair'].setValue(n)
   }

   get fluctated() {
    return this.PriceForm.get('fluctated')
   }

   set fluctated(n) {
    this.PriceForm.controls['fluctated'].setValue(n)
   }

   get dis() {
    return this.PriceForm.get('dis')
   }

   set dis(n) {
    this.PriceForm.controls['dis'].setValue(n)
   }


  constructor(private router : Router, private route : ActivatedRoute, public fb : FormBuilder, public productService : ProductService,
    private toastr: ToastrService) {
  this.subscribe1 =  this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state) {

        this.product_id = this.router.getCurrentNavigation().extras.state.product_id
        this.fair = this.router.getCurrentNavigation().extras.state.fair_price
        this.fluctated = this.router.getCurrentNavigation().extras.state.fluatuated_price
        this.dis = this.router.getCurrentNavigation().extras.state.discount


      }
    })
   }

  ngOnInit(): void {
  }

  PriceForm = this.fb.group({
    fair : ['' , Validators.required],
    fluctated : ['' ],
    dis : ['']
  })

  update(){
    let price = {
      fair_price : this.fair.value,
      fluctuated_price : this.fluctated.value,
      discount : this.dis.value
    }

    console.log(price)

   this.subscribe2 = this.productService.patchProductPrice(this.product_id,price).subscribe(data =>{
      if(data) {
        console.log(data)
        this.toastr.success("Price successfully updated")
        this.router.navigate(['all-products'])
      }

      else {
        this.toastr.error("Can't update. Please try again later")
      }
    })
  }

  ngOnDestroy(){
    this.subscribe1.unsubscribe()
  }
}
