import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';
import { AddressModalPage } from '../address-modal/address-modal.page';
import { ModalController } from '@ionic/angular';
import { EMPTY, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { TotalService } from 'src/app/services/total.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage   {

  user_id:any;
  firebase_uid: any;
  id: any;
  cart =   [];
  quantity : any =[1,2,3,4,5,6,7,8,9,10,15,20,25,30,35,40,45,50,60,70,80,100];

  address:any;
  primary_address : any;
  no_Address : boolean = false;
  yes_address: boolean = false;
  pincode;
  
  concat : any;
  cartItemCount : any;
  count: any;

  delivery: any;
  total : any;
  new_Address : any;
  address_id : any;
  compareWith : any ;

  subscrib1: Subscription
  subscrib2: Subscription

  





  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService,
    public afauth: AngularFireAuth, public userService :UserService,public storageService : StorageService,
    public alertController: AlertController,public toastController: ToastController, public addressService :AddressService,
    public modalController: ModalController, public totalService : TotalService ) {
    
      this.delivery = 15;

      console.log('in constructor of cartss')

   this.subscrib1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user_id = this.router.getCurrentNavigation().extras.state.user_id;
        console.log("id "  +this.user_id)


        if(this.router.getCurrentNavigation().extras.state.added_address) {

          this.new_Address = this.router.getCurrentNavigation().extras.state.added_address;
        if(this.new_Address) {

          console.log(this.new_Address)
          this.address_id = this.new_Address.address_id
          this.user_id = this.new_Address.user_id
          this.no_Address = false
          this.pincode = this.new_Address.pincode
          this.concat = [this.new_Address.address_line1, this.new_Address.address_line2,  this.new_Address.landmark , this.new_Address.city, this.new_Address.state,
            this.new_Address.alternate_mobile_no ].filter(Boolean).join(", ");
          
          console.log(this.concat)
          console.log(this.address_id)  
  
        }

        }

        if(this.router.getCurrentNavigation().extras.state.address_id) {
          let id = this.router.getCurrentNavigation().extras.state.address_id;
          this.address_id = id
          console.log(this.address_id)

        }
        

      }
    });
   }
  

   
   ngOnInit(){
     console.log('in onit of carts')
     this.getAddress()

   }
   

  ionViewDidEnter(){
    

    console.log(this.router.getCurrentNavigation())
    this.getcart()

  }
  
  getAddress(){

//    console.log(this.router.getCurrentNavigation().extras)

   
    
    this.addressService.getdefaultAddress(this.user_id).pipe(
      concatMap(data => data === null ? EMPTY : this.addressService.getFirstAddress(this.user_id))).pipe(
        untilDestroyed(this)
      ).subscribe(data =>{

      console.log(data)
      console.log(data.address_id)

      this.address= data;
      console.log(this.address.pincode)
//      console.log(this.address)

         for(let i=0; i<this.address.length; i++) {
           
          this.pincode = this.address[i].pincode
          this.address_id = this.address[i].address_id
           
           this.concat = [this.address[i].address_line1 , this.address[i].address_line2 , this.address[i].landmark , this.address[i].city,
           this.address[i].state , this.address[i].alternate_mobile_no].filter(Boolean).join(", ");
           
         }
         if(!data || !data.length){
           console.log("no address")
           this.no_Address = true
         }

         else {
          console.log("default address")
          this.yes_address = true
         }
            
       }) 
  }
 
  getcart(){
    if(this.user_id) {

      
       
     this.cartService.getCartItems(this.user_id).pipe(
       untilDestroyed(this)
     ).subscribe(data =>{

        if(data) {

          this.cart = data;
  
          console.log(this.cart)
            this.count  =this.cart.length
          console.log ("total items " + this.cart.length)

          for(let i=0 ;i<this.cart.length; i++){

      
            this.cart[i].disabled = false
            let stocks = this.cart[i].product.stocks
            let prices = this.cart[i].product.productPrices

            if(stocks){
              for(let j=0; j<stocks.length;j++){
                let remaining = stocks[j].RemainingQuantity
                console.log(remaining)

                console.log(this.cart[i].quantity)
    
                if(remaining < this.cart[i].quantity) {
                  console.log("small")
                  this.cart[i].disabled = true
                  console.log(this.cart)
                }
              }
            }
  
            else {
              this.cart[i].disabled = true
            }

            console.log(prices)
            for(let j=0; j<prices.length ;j++ ){
              let product_price =prices[j].fair_price + prices[j].fluctuated_price - prices[j].discount
              console.log(product_price)

              console.log(this.cart[i].price)

              if(this.cart[i].price != product_price) {

                console.log("cart price" + this.cart[i].price)
                console.log("product price " +product_price)
                console.log("doesn't match")
                console.log("cart_id" +this.cart[i].cart_id)
                this.cart[i].price = product_price

                let patch = {
                  price : product_price
                }
            
                this.cartService.updatecartItem(this.user_id, this.cart[i].cart_id, patch).pipe(
                  untilDestroyed(this)
                ).subscribe(data =>{
                  console.log(data)
            
                })
              }
            }

          }
          
        }

        else{
          console.log("error")
        }
       
        
      })
    }

    else {
     this.subscrib2 =  this.userService.userid_behaviour.pipe(
       untilDestroyed(this)
     ).subscribe(data => {
        if(data != null){
          this.user_id = data
          this.getcart()

        }
      })
    }
 

  }

  

  onChange(new_quantity,object, stock, index ) {


    console.log(this.cart[index].product.stocks)
    console.log(object.product.name)
    console.log("Quantity new " + new_quantity)
    console.log("price per kg "  + object.price)
    console.log("Quantity Old " + object.quantity)
    console.log("cart_id " + object.cart_id)
    let x = object.quantity

    let stocks = stock
    console.log(stocks)
   
    if(stocks) {

      for(let i=0; i<stocks.length; i++) {
        if(new_quantity > stocks[i].RemainingQuantity){
  

          console.log(new_quantity)
          console.log(object.quantity)
          console.log(stocks[i].RemainingQuantity)
  
          object.disabled = true
          console.log("quantity not available")

          this.presentAlert()
        }
        else {

          object.quantity = new_quantity;

          let cart = {
            date : new Date,
            quantity : Number (new_quantity),
            
          }
      
      
         this.cartService.updatecartItem( object.user_id,object.cart_id, cart).pipe(
          untilDestroyed(this)
        ).subscribe(data =>{
      
            if(data) {
              console.log(data)
              console.log(data.body)
              this.presentToast(new_quantity,x, object.product.name, object.product.unit)
            }
      
            else {
              console.log("error")
            }
           
         
          })

        }
  
        if(new_quantity <= stocks[i].RemainingQuantity){
          object.disabled = false
        }
      }
    }

  
    

  }



  getTotal() {

    return this.cart.reduce((i, j) => i + j.price * j.quantity , 0);
}
 
  
  async checkout() {

    let x = this.getTotal() + this.delivery

    this.totalService.set_grandTotal(x)

    console.log(this.address_id)
    console.log(this.concat)
    console.log(this.pincode)
    this.totalService.set_Addressid(this.address_id)

    this.storageService.set('address_id', this.address_id).then(val =>{console.log(val)})


    let navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user_id,
        total : x,
        address_id : this.address_id,
        address : this.concat,
        pincode : this.pincode
      }
    };


    this.router.navigate(['tabs/tab5/payment-options'], navigationExtras)

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Quantity not available',
      message: 'Please, Try changing it.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm(user_id,cart_id, product_id) {

    console.log("user" + user_id)
    console.log(product_id)
    console.log(cart_id)
    const alert = await this.alertController.create({
      header: 'Remove item',
      message: 'Are you sure you want to remove item from user cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Remove',
          handler: () => {
            console.log('Confirm Okay');
        
            this.cartService.deleteCartItem(user_id,cart_id).pipe(
            untilDestroyed(this)
          ).subscribe(data =>{
              console.log(data)

              for (let [index, p] of this.cart.entries()) {

                if (p.product.product_id === product_id) {
                  this.cart.splice(index,1);

                  this.cartService.final_count(this.user_id)

                }

              }

            })


          }
        }
      ]
    });

    await alert.present();
  }

  
  async presentToast(new_quantity,quantity, product_name, unit ) {
    const toast = await this.toastController.create({
      message: 'Succesfully changed quantity of product ' + product_name + ' from ' + quantity + ' ' + unit +  ' to ' + new_quantity + ' ' + unit,
      duration: 2000
    });
    toast.present();
  }

  async address_modal(){
   // console.log("clicked")
   console.log(this.user_id)
    const modal = await this.modalController.create({
      component: AddressModalPage,
      cssClass : 'address-modal',
      componentProps : {
        user_id : this.user_id
      } 
    });

    modal.onDidDismiss()
     .then((data) => {
       const user = data['data']; 
       console.log(user)

       
       if(user == undefined || user == null  )  {
         console.log("modal closed without selecting anything")
       } 
        
       else {
        /*
        if(typeof user == "number"){

        

          console.log("address_id  " + user)
            if(user == this.address_id) {

              console.log("default address deleted")
              this.no_Address = true
              this.yes_address = false
              this.new_Address = false

              this.concat = null
            }

            else {
              this.yes_address = true          
            }
          
        }
*/
         

        console.log("address selected")  

        console.log(user)
          this.address = user 
          this.address_id = user.address_id

          this.pincode = this.address.pincode
          this.concat = [this.address.address_line1, this.address.address_line2,  this.address.landmark , this.address.city,
          this.address.state, this.address.alternate_mobile_no ].filter(Boolean).join(", ");
          
          console.log(this.concat)
         

        
       }
      

   });

     await modal.present();

     if(!window.history.state.modal){
       const modalState = {modal : true};
       history.pushState(modalState, null)
     }
  }


  ionViewWillLeave(){
    this.subscrib1.unsubscribe()
    console.log(this.subscrib1.closed)

 

    if(this.subscrib2 instanceof Subscription){
      this.subscrib2.unsubscribe()
      console.log(this.subscrib2.closed)
    }

  }

}
  /* user id

   else {
      
      this.storageService.get('user_id').then(val =>{
        
        if(val) {
          this.user_id = Number(val);
          console.log("from cart")
          this.getcart()
        }
  
        else  {
          this.storageService.get('firebase_uid').then(val =>{
            if(val) {
              // add user service
              this.firebase_uid = val;

  
              this.userService.findUserId(this.firebase_uid).subscribe(q =>{
                console.log(q)
                if(q) {
                  this.id = q;
                  for(let i =0; i<this.id.length;i++) {
                    this.user_id = this.id[i].id
                    this.getcart()
    
                  }
    
    
                  this.storageService.set('user_id', this.user_id ).then(result => {
                    console.log('Data is saved');
                    }).catch(e => {
                    console.log("error: " + e);
                    });
                }
                else{console.log("error")}
 
              })
              
  
            }
  
            else {
  
              this.afauth.authState.subscribe(user =>{
                if(user) {
                  this.firebase_uid = user.uid; 
  
  
                  this.storageService.set('firebase_uid', this.firebase_uid ).then(result => {
                    console.log('Data is saved');
                    }).catch(e => {
                    console.log("error: " + e);
                    });
  
  
                    this.userService.findUserId(this.firebase_uid).subscribe(data =>{
                      if(data) {

                       this.id = data;
                        for(let i = 0 ;i<this.id.length; i++ ){
                          this.user_id = this.id[i].id
                          this.getcart()
                        }
    
                        this.storageService.set('user_id', this.user_id ).then(result => {
                          console.log('Data is saved');
                          }).catch(e => {
                          console.log("error: " + e);
                          });
                      }

                      else {
                        console.log("error")
                      }
  
                     
                    })
  
                }
              })
            }
          }).catch(err =>{
            console.log(err)
          })
        }
      }).catch(err =>{
        console.log(err)

        
      })
    
    }



  */


