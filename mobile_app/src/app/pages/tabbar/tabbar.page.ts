import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription, Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.page.html',
  styleUrls: ['./tabbar.page.scss'],
})
export class TabbarPage implements OnInit {

  user_id: any;
  subscribe1: Subscription
  count: Observable<any>;
  hide_tab: Observable<any>;


  constructor(public userService: UserService, private router: Router, private cartService: CartService) {
    console.log('in tab bar constructor')


  }

  async ionViewWillEnter() {

    await this.userService.hide_tab.next(false)
    this.hide_tab = await this.userService.hide_tab

    console.log('in tab bar view load  ')


    this.subscribe1 = this.userService.userid_behaviour.subscribe(data => {
      console.log(data)

      if (data) {
        this.user_id = data
        console.log('tab' + this.user_id)
        this.getcartCount(this.user_id)
      }
      else {
        console.log('id is empty')
      }
    })
  }

  ngOnInit() {


  }



  async getcartCount(id) {

    await this.cartService.final_count(id)

    this.count = await this.cartService.cart_count

  }


  tab1() {

    let navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user_id
      }
    }
    this.router.navigate(['tabs/tab1'], navigationExtras)
  }

  tab2() {

    let navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user_id
      }
    }
    this.router.navigate(['tabs/tab2'], navigationExtras)
  }

  tab3() {

    let navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user_id
      }
    }
    this.router.navigate(['tabs/tab3'], navigationExtras)
  }

  tab4() {

    let navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user_id
      }
    }
    this.router.navigate(['tabs/tab4'], navigationExtras)
  }

  async tab5() {

   await this.userService.hide_tab.next(true);
   this.hide_tab = await this.userService.hide_tab
    let navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user_id
      }
    }
    this.router.navigate(['tabs/tab5'], navigationExtras)
  }


}
