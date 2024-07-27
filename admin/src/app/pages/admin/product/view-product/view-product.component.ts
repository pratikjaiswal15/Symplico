import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  data: any;
  myid = null;
  product;
  editable;
  subscribe1 : Subscription

  constructor(private route: ActivatedRoute, private router: Router) {

   this.subscribe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        console.log(this.data)
        this.myid = this.data.product_id
        
        //console.log(this.data)
      }
    });

   }

  ngOnInit() {

  }
  ngOnDestroy(){
    this.subscribe1.unsubscribe()
  }
}
