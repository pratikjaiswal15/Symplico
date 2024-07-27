import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrdersapiService } from 'src/app/services/ordersapi.service';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingController, AlertController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { TotalService } from 'src/app/services/total.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';


declare var Razorpay: any;

@UntilDestroy()
@Component({
  selector: 'app-netbanking',
  templateUrl: './netbanking.page.html',
  styleUrls: ['./netbanking.page.scss'],
})

export class NetbankingPage implements OnInit {

  razorpay : any;
  banks : [];
  display :  boolean = false;
  hdfc;
  icici;
  sbi;
  axis;
  kotak;
  idbi;

  total:any;
  user_id1 :any;
  delivery: any;
  check: any;
  cart:any;
  firebase_uid;
  id;
  receipt;
  phone_number : any;
  email : any;
  address_id: any;
  concat:any;
  pincode : any;
  subscribe1: Subscription

  constructor(private route: ActivatedRoute, private router: Router, public storageService : StorageService, public ordersapiService : OrdersapiService,
    public cartService : CartService, public userService : UserService, public totalService :TotalService,
    public alertController  : AlertController, public afauth: AngularFireAuth, public cd: ChangeDetectorRef, public loadingService : LoadingService  ) {

      this.delivery = 15;
    this.subscribe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.total = this.router.getCurrentNavigation().extras.state.total;
        this.user_id1 = this.router.getCurrentNavigation().extras.state.user_id;
        this.address_id = this.router.getCurrentNavigation().extras.state.address_id;
        this.concat = this.router.getCurrentNavigation().extras.state.address;
        this.pincode = this.router.getCurrentNavigation().extras.state.pincode;

        console.log(this.concat)
        console.log(this.pincode)

      

      }
      else {
        let x = this.totalService.getAddress_id()
        if(x) {
          this.address_id = x
        }
        else {
          this.storageService.get('address_id').then(val =>{
            console.log(val)
            this.address_id = val
          })
        }
      }

    
      this.storageService.get('phone_number').then(data =>{
        console.log(data)
        this.phone_number = data
      })
      this.storageService.get('email').then(data=>{
        console.log(data)
        this.email = data
      })


    });


   }
   

    ngOnInit() {
       
    this.loadingService.present()  
    this.receipt = this.unique('receipt')

    this.validate()

    this.razorpay = new Razorpay({
      key : 'rzp_test_rHtoop1fZXneoh',
      key_secret: 'Rle0yzx7WK93CKaeCufQGnA6',
    })
  

    this.razorpay.once('ready', async (response) => {
      
      this.banks = response.methods.netbanking
      //console.log(this.banks)

      this.hdfc = response.methods.netbanking.HDFC
      //console.log(this.hdfc)

      this.icici = response.methods.netbanking.ICIC
      //console.log(this.icici)

      this.idbi = response.methods.netbanking.IBKL
      //console.log(this.idbi)

      this.kotak = response.methods.netbanking.KKBK
      //console.log(this.kotak)

      this.sbi = response.methods.netbanking.SBIN
      //console.log(this.sbi)

      this.axis = response.methods.netbanking.UTIB

    //  console.log(this.axis)

      this.display = true
      this.cd.detectChanges()

      this.loadingService.dismiss()
    })
    
  }

 unique(string){
  return string + Math.random().toString(36).substr(2, 9);

 }
  
  selected_bank(key){

    let order_id = this.unique('orders')

    let bank_key = key
    console.log(key)

    if(this.phone_number && this.email) {
        
      console.log("clicked")

        var options = {
          amount :  (this.total * 100),  
          currency: "INR",
          receipt : this.receipt,
          payment_capture: '1'
    };

   
      console.log(options)

      this.ordersapiService.CaptureOrder(options).pipe(
        untilDestroyed(this)
      ).subscribe(data =>{
        console.log(data)
        console.log(data.id)

        let order_id = data.id
        let generated_receipt = data.receipt 

        let notes = {
          status : "placed",
          user_id : this.user_id1,
          address_id : this.address_id,
          delivery_address : this.concat || '',
          pincode : this.pincode || ''

        }

        let payment = {
          amount: (this.total * 100),
          email: this.email ,
          contact: this.phone_number,
          order_id: order_id,
          method: 'netbanking',
          bank: key,
          notes: notes,
          callback_url  : 'http://192.168.43.147:3000/payment-check',
        /*  handler : function(response){
            console.log('handler')
            console.log(response)
            alert(response.razorpay_payment_id)
            this.router.navigate(['order-success'])
            
          }    
        */
        }
        console.log(payment)
        this.razorpay.createPayment(payment)

    
        this.razorpay.on('payment.success', function(resp) {

         console.log("success")
        
        });

  
        
        this.razorpay.on('payment.error',  function(resp){
          alert(resp.error.description)
        });

      })

      
      }

      else {        
        if(this.user_id1) {
          /*
          this.userService.get_mobileAndMail(this.user_id1).subscribe(data =>{
            console.log(data)

            this.phone_number = data.mobile_no
            this.email = data.email

            this.storageService.set('phone_number', this.phone_number).then(data =>{console.log(data)})
            this.storageService.set('email', this.email).then(data =>{console.log(data)})


            this.selected_bank(bank_key)
          })
          */

         this.afauth.authState.pipe(
           untilDestroyed(this)
         ).subscribe(user =>{
          if(user) {
            this.phone_number = user.phoneNumber
            this.email = user.email
 
            this.storageService.set('phone_number', this.phone_number).then(data =>{console.log(data)})
            this.storageService.set('email', this.email).then(data =>{console.log(data)})
 
 
            this.selected_bank(bank_key)
          }
        })
        }
      }

  }

 
  
  async validate(){
    let x = this.totalService.get_grandTotal()
    if(this.total){
      console.log(this.total)
      console.log(this.user_id1)
     }
     else{
       
        this.check = this.totalService.get_grandTotal()
        if(this.check) {
          console.log("check " + this.check)
          this.total = this.check
        }
        else {
          this.getuser_id(this.user_id1)

        }
         
      
     }
    
  }

  
  getTotal(cart) {

    let price = cart.reduce((i, j) => i + j.price * j.quantity , 0);
    console.log("price" + price)
    this.total = price + this.delivery 
    console.log(this.total)     
}

  

async getuser_id(user_id){
  if(user_id) {
    this.user_id1 =user_id
    this.cartService.getCartItems(user_id).pipe(
      untilDestroyed(this)
    ).subscribe(data =>{

      if(data) {
        console.log(data)
        this.cart = data;
        this.getTotal(this.cart)
      }

      else{
        console.log("error")
      }
     
    })
  }

  else {
    this.userService.userid_behaviour.pipe(untilDestroyed(this))
    .subscribe(val =>{

      if(val) {
      
        this.user_id1 = val
        console.log(this.user_id1)  
        this.getuser_id(this.user_id1)
      }       
    })
  }
  
}


async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Payment successfull',
    message: "Congasulations! Your payment is suucessfull",
    buttons: ['OK']
  });

  await alert.present();
}

ionViewWillLeave(){
  this.subscribe1.unsubscribe()
}

}