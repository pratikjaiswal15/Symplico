import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrdersService } from 'src/app/services/orders.service';

@UntilDestroy()
@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss']
})
export class PastOrdersComponent implements OnInit {

  limit = 50 ;
  skip = 0;
  page = 0;
  total_pages : number;
  show: boolean = false;
  orders = [];

  constructor(public ordersService : OrdersService) { }

  async ngOnInit(): Promise<void> {
    await this.getCount()
    await this.getData(this.limit, this.skip)
  }

  getCount () {
    this.ordersService.PastOrdersCount()
    .pipe(untilDestroyed(this))
    .subscribe(data => {
      console.log(data.count)
      this.total_pages = Math.round(data.count / this.limit)
      console.log(`total -${this.total_pages}`)

    })
      }

  getData(limit, skip){
     this.ordersService.GetPastOrders(limit, skip).subscribe(data =>{
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
}

