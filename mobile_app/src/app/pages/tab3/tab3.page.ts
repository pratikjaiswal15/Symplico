import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  subscribe1 : Subscription
  
  constructor(private route :ActivatedRoute, private router :Router) {

    this.subscribe1 =  this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        console.log(this.router.getCurrentNavigation().extras.state.user_id)
      }
    })

   }

  ngOnInit() {
  }

}
