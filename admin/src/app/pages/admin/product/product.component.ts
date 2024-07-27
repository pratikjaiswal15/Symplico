import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {


  product_list;
  date;
  filter_name;
  searchTerm;
  subscribe1 : Subscription;
  subscribe2 : Subscription;


  constructor(public productService : ProductService,private router: Router, ) {

    
   }

   ngOnInit() {
    this.date = new Date();
    this.getAllProducts()

  }

  
  getAllProducts() {
   this.subscribe1= this.productService.ProductWithPRices().subscribe(data => {
     
      if(data){
        this.product_list = data;
      }
    })
  }

  view(t) {
    let navigationExtras: NavigationExtras = {
      state: {
       cat : t 
      }
  };
  this.router.navigate(['view-one-product/:' + t.product_id], navigationExtras);
  }

  update(u, id) {


    let navigationExtras: NavigationExtras = {
      state: {
       cat : u
      }
  };
  this.router.navigate(['update-one-product/:' + id ], navigationExtras);
  
  }

  delete(id) {

    
   this.subscribe2 = this.productService.deleteProduct(id).subscribe( data => {
    }
    )
    this.router.navigateByUrl("all-products")
  
    }

    patch_price(id,fair_price, fluatuated_price, discount){
     
      console.log(id)
      console.log(fair_price)
      console.log(fluatuated_price)
      console.log(discount)

      let navigationExtras: NavigationExtras = {
        state: {
          product_id : id,
          fair_price : fair_price,
          fluatuated_price : fluatuated_price,
          discount : discount
        }
    };
    this.router.navigate(['change-product-price'  ], navigationExtras);

    }

 ngOnDestroy(){

 }
}
