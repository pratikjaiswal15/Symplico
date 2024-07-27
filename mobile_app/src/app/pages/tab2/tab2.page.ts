import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  subscribe1: Subscription

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
