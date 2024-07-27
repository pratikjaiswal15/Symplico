import { Component, OnInit, Input } from '@angular/core';
import { AddressService } from '../../services/address.service'
import { NavParams } from '@ionic/angular';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()

@Component({
  selector: 'app-address-popover',
  templateUrl: './address-popover.page.html',
  styleUrls: ['./address-popover.page.scss'],
})
export class AddressPopoverPage implements OnInit {


  @Input() user_id: any;
  @Input() address_id: any;
  @Input() address : any;

  constructor(public AddressService : AddressService, navParams: NavParams, public alertController: AlertController,
    public PopoverController : PopoverController, private router: Router, public modalController :ModalController, public userService :UserService) { 
   
    this.user_id = navParams.get('user_id')
    this.address = navParams.get('address')
    console.log(this.address)

    this.address_id = this.address.address_id
    console.log("address_id " + this.address_id)

    if(!this.user_id) {
      this.userService.userid_behaviour.pipe(
        untilDestroyed(this)
      ).subscribe(val =>{
        if(val){
          this.user_id = val
          console.log(this.user_id)          
    
        }
        
      }) 
    }  

  }

  
  ngOnInit() {

  }

  edit(){
    console.log("edit")

    this.PopoverController.dismiss()
    this.modalController.dismiss()

    let navigationExtras : NavigationExtras = {

      state :{
        edit_address : this.address
      }
    }
    this.router.navigate(['tabs/tab5/add-address'], navigationExtras)


  }

  async delete(){
    console.log("delete")

    console.log(this.user_id)
    console.log(this.address_id)



   const alert = await this.alertController.create({
    header: 'Delete address!',
    message: 'Do you really want to remove this address?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async (blah) => {
          console.log('Confirm Cancel: blah');

          await this.PopoverController.dismiss()

        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
  
          this.AddressService.deleteAddress(this.user_id, this.address_id).pipe(
            untilDestroyed(this)
          ).subscribe(async data =>{
            

            let url = data.url
            let address_id = url.split("addresses/").pop(); 

            console.log(address_id)

            await this.PopoverController.dismiss(address_id)

          })

        }
      }
    ]
  });

  await alert.present();

   
    
  }
}
