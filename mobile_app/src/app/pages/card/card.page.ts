import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { TotalService } from 'src/app/services/total.service';
import { CartService } from 'src/app/services/cart.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from 'src/app/services/storage.service';
import { OrdersapiService } from 'src/app/services/ordersapi.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';


declare var Razorpay: any;

const range = (start, end, step) => {
  return Array.from(Array.from(Array(Math.ceil((end-start)/step)).keys()), x => start+ x*step);
}

@UntilDestroy()

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})


export class CardPage implements OnInit {

 
  user_id1: any;
  total: any;
  delivery: any;
  check: any;
  cart:any;
  firebase_uid;
  id;


  creditCardNumber: string;
  address_id: any;
  concat:any;
  pincode : any;
  phone_number : any;
  email : any;
  receipt: any;
  razorpay : any;
  
 
  subscribe1: Subscription


  constructor(private fb:FormBuilder, private route: ActivatedRoute, private router: Router , public storageService : StorageService,
    public cartService : CartService, public userService : UserService, public afauth: AngularFireAuth, public totalService :TotalService,
    public ordersapiService : OrdersapiService) { 
    
      this.delivery = 15
   this.subscribe1 = this.route.queryParams.subscribe(params => {


      if (this.router.getCurrentNavigation().extras.state) {
        this.total = this.router.getCurrentNavigation().extras.state.total;
        this.user_id1 = this.router.getCurrentNavigation().extras.state.user_id;
        this.address_id = this.router.getCurrentNavigation().extras.state.address_id;
        this.concat = this.router.getCurrentNavigation().extras.state.address;
        this.pincode = this.router.getCurrentNavigation().extras.state.pincode;


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

  
  year2:any;
  month2 : any[] =[
    {'code': '01'}, {'code': '02'}, {'code': '03'},
    {'code': '04'}, {'code': '05'}, {'code': '06'},
    {'code': '07'}, {'code': '08'}, {'code': '09'},
    {'code': '10'}, {'code': '11'}, {'code': '12'},
  ]

  get name() {
    return this.card.get('name')
   }
   
   set name(u) {
    this.card.controls['name'].setValue(u)
  }

  get cardnumber() {
    return this.card.get('cardnumber')
   }
   
   set cardnumber(u) {
    this.card.controls['cardnumber'].setValue(u)
  }

  get month() {
    return this.card.get('month')
   }
   
   set month(u) {
    this.card.controls['month'].setValue(u)
  }
  
  get year() {
    return this.card.get('year')
   }
   
   set year(u) {
    this.card.controls['year'].setValue(u)
  }


  get cvv() {
    return this.card.get('cvv')
   }
   
   set cvv(u) {
    this.card.controls['cvv'].setValue(u)
  }

  card = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z ]*') ] ],
    cardnumber : ['', [Validators.required, Validators.minLength(19), Validators.maxLength(20), Validators.pattern('[0-9 ]*') ]],
    month : ['', Validators.required],
    year : ['', Validators.required],
    cvv : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]*') ]]
  })
 
  
  ngOnInit() {

    
      this.receipt = this.unique('receipt')

      this.year2= range(20,90,1)

      this.razorpay = new Razorpay({
        key : 'rzp_test_rHtoop1fZXneoh',
        key_secret: 'Rle0yzx7WK93CKaeCufQGnA6',
        
      })
 
      
      this.validate()         
      
  }
  
  cc_format(value: string) {
    const input = event.target as any;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }
    input.value = numbers.join(' ');
    this.cardnumber = input.value
  }

 

  submit(x){

    let card = x
    let order_id = this.unique('orders')

    console.log(x)

    console.log(this.total)

    if(this.phone_number && this.email){

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

        console.log(notes)

        let payment = {
          amount: (this.total * 100),
          email: this.email ,
          contact: this.phone_number,
          order_id: order_id,
          method: 'card',
          'card[name]': this.name.value,
          'card[number]': this.cardnumber.value.replace(/\s/g, ""),
          'card[cvv]': this.cvv.value,
          'card[expiry_month]': this.month.value,
          'card[expiry_year]': this.year.value,
          notes: notes,
          callback_url  : 'http://192.168.43.147:3000/payment-check'    
        
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

        console.log("hi")
        /*
        this.userService.get_mobileAndMail(this.user_id1).subscribe(data =>{
          console.log(data)

          this.phone_number = data.mobile_no
          this.email = data.email

          this.storageService.set('phone_number', this.phone_number).then(data =>{console.log(data)})
          this.storageService.set('email', this.email).then(data =>{console.log(data)})


          this.submit(card)
        })
        */
       this.afauth.authState.pipe(
         untilDestroyed(this)
       ).subscribe(user =>{
         if(user) {
           console.log(user)
           this.phone_number = user.phoneNumber
           this.email = user.email

           this.storageService.set('phone_number', this.phone_number).then(data =>{console.log(data)})
           this.storageService.set('email', this.email).then(data =>{console.log(data)})


          this.submit(card)
         }
       })
      }
    }
   
  }

  unique(string){
    return string + Math.random().toString(36).substr(2, 9);
  
   }

  async validate(){
    if(this.total){
      console.log(this.total)
      console.log(this.user_id1)
     }
     else{
       
        this.check = this.totalService.get_grandTotal()
        if(this.check) {
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

        else {
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
 
  ionViewWillLeave(){
    this.subscribe1.unsubscribe()
  }
}

