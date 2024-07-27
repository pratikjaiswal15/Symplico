import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrdersService } from 'src/app/services/orders.service';

@UntilDestroy()

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  subscribe1 : Subscription;
  subscribe2: Subscription;
  subscribe3: Subscription;

  order_count: any;
  limit = 50 ;
  skip = 0;
  page = 0;
  total_pages : number;
  show: boolean = false;
  orders = [];
  panelOpenState = false;

  constructor(private route : ActivatedRoute, private router :Router, private ordersService :OrdersService) {
    this.subscribe1 = this.route.queryParams.subscribe(() =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.order_count = this.router.getCurrentNavigation().extras.state.order_count
        console.log(this.order_count)
        this.getCount(this.order_count)
      }

      else {
        this.subscribe3 = this.ordersService.NewOrdersCount().subscribe(data =>{
          if(data) {
            this.order_count = data.count 
            console.log(this.order_count)
            this.getCount(this.order_count)

          }
        })
      }
    })

   }

  ngOnInit(): void {
    this.getData(this.limit,this.skip)
  }

  getCount (count) {
    this.total_pages = Math.round(count / this.limit)
    console.log(`total -${this.total_pages}`)
  }

  getData(limit, skip){
    this.subscribe2 = this.ordersService.GetNewOrders(limit, skip).subscribe(data =>{
      if(data){
        this.show = true
        this.orders = this.orders.concat(data)
        console.log(this.orders)
      }
    })
  }

  onScroll(){
    
    this.page ++;
    if(this.page === this.total_pages) {
      console.log("finished")
      return;
    }

    console.log("scrolled")
    console.log(`page -  ${this.page}, total pages -  ${this.total_pages}`)
    this.skip = this.skip + 50;

    this.getData(this.limit, this.skip)


  }

  packed(event, order_id) {
    event.stopPropagation()

    let data = {
      status : 'packed'
    }

    this.ordersService.patchOrder(order_id, data)
    .pipe(untilDestroyed(this))
    .subscribe(data => console.log(data))

  }

  shipped(event, order_id) {
    event.stopPropagation()

    let data = {
      status : 'shipped'
    }

    this.ordersService.patchOrder(order_id, data)
    .pipe(untilDestroyed(this))
    .subscribe(data => console.log(data))

  }


  delivered(event, order_id) {
    event.stopPropagation()

    let data = {
      status : 'delivered'
    }

    this.ordersService.patchOrder(order_id, data)
    .pipe(untilDestroyed(this))
    .subscribe(data => console.log(data))

  }

  ngOnDestroy(){
    this.subscribe1.unsubscribe()
  }
}
