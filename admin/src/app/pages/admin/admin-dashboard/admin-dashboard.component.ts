import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  subscribe : Subscription; 

  order_count: any;
  constructor(private ordersService :OrdersService, private router : Router, public authenticationService: AuthenticationService, private http : HttpClient,
    public urlService : UrlService
 ) { }


  ngOnInit() {

//    this.add()

    this.subscribe = this.ordersService.NewOrdersCount().subscribe(data =>{
      if(data){
        console.log(data.count)
        this.order_count = data.count
      }
    })
  }

  orders(){
    let navigationExtras : NavigationExtras ={
      state :{
        order_count : this.order_count  
      }
    }
    this.router.navigate(['orders'], navigationExtras)
  }

  async logout(){
    this.authenticationService.logout()
}
  

past_orders(){
 console.log('clikde')   
}

// add(){
//   let data = {
//     email : 'admin@gmail.com',
//     role : 'admin',
//     mobile_no : '+919552869559',
//     uid : 'VIxehR3EEtT1xvFVoRiHHdc8by02',
//     name : 'admin',
//     business_name: 'symplico'
//   }
  
//   this.http.post(`${this.urlService.url}users`, data)
//   .pipe(untilDestroyed(this))
//   .subscribe(data => console.log(data))
  
//   }

ngOnDestroy() {
  
}

  
}
