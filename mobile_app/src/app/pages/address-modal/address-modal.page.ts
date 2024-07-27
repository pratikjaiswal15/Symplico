import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';
import { AddressPopoverPage } from '../address-popover/address-popover.page'
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationExtras } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';

@UntilDestroy()

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.page.html',
  styleUrls: ['./address-modal.page.scss'],
})
export class AddressModalPage implements OnInit {

  @Input() user_id: any;
  all_address = [];

  firebase_uid: any;
  id: any;
  pincode: any;
  concat: any;


  constructor(public modalController: ModalController, navParams: NavParams, public addressService : AddressService, 
    private popoverController: PopoverController , public userService :UserService, private router: Router  ) {

      console.log(navParams.get('user_id'))
      this.user_id = navParams.get('user_id')

      console.log("user_id " +  this.user_id)
      //console.log("hi")

    
   }

  ngOnInit() {

    this.getAll_address()

   
  }

  async getAll_address() {

    if(this.user_id) {
      this.addressService.getAllAddress(this.user_id).pipe(
        untilDestroyed(this)
      ).subscribe(data =>{
        
        if(data) {
          console.log(data)
          this.all_address = data 
        }
        else {
          console.log("error")
        }
       

      })
    }

    else {

     this.userService.userid_behaviour.pipe(
       untilDestroyed(this)
     ).subscribe(val =>{
       if(val) {
        this.user_id = val
        console.log(this.user_id)   
       }
               
  
      })
    }
  }

  close(){
    this.modalController.dismiss()
  }

  selected_address(address) {

    this.modalController.dismiss(address)
  }


  async add_address(){

    this.modalController.dismiss()

    let navigationExtras : NavigationExtras ={
      state :{
        user_id : this.user_id
      }
    }

    this.router.navigate(['tabs/tab5/add-address'],navigationExtras)
    
  }

 async button_clicked(ev: any,address){
    console.log("button")
    console.log(address)

    const popover = await this.popoverController.create({
      component: AddressPopoverPage,
      event: ev,
      animated: true,
      showBackdrop: true,
      componentProps : {
        user_id : this.user_id,
        address : address

      }
  });

      popover.onDidDismiss().then(data =>{

        const deleted_id = data['data']; // Here's your selected user!
        console.log(deleted_id)

       
       if(deleted_id == undefined || deleted_id == null  )  {
         console.log(" Popover closed without deleting address")
       }
       else{

         
          for (let [index, p] of this.all_address.entries()) {

            console.log("address id of  p" +  p.address_id)
            console.log("sent from popover " + deleted_id)

            if (p.address_id == deleted_id) {

              console.log("matched")

              this.all_address.splice(index,1);
              console.log("address deleted")
              this.modalController.dismiss(p.address_id)
            }
          
         }
       } 
        
      })
    return await popover.present();
  }

  ionViewWillLeave(){
    
  }
}
