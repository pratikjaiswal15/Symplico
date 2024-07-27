import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { AngularFireAuth } from '@angular/fire/auth';


@UntilDestroy()

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
 
  user_id: any;
  count: Observable<any>;
  products = [];
  cart : any;
  quantity : any =[1,2,3,4,5,6,7,8,9,10,15,20,25,30,35,40,45,50,60,70,80,100];
  selected_quant = 1;
  price : any;
  cartItemCount : any;



 
  slideOpts = {
    zoom : false,
    slidesPerView : 2,
    centeredSlides : true,
    spaceBetween :  20,
    //autoHeight : true 
  };
  
  subscribe2: Subscription;

 

  constructor(public userService :UserService, private cartService: CartService,private afauth : AngularFireAuth,
    public alertController :AlertController, public modalController: ModalController ) {
    
   this.userService.userid_behaviour.subscribe(val =>{
      if(val != null) {

        console.log('tab1' + val)
        this.user_id = val
        console.log(this.user_id)          
      }
    }) 
   }



   ngOnInit() {
    this.getProducts()
  }


 

  getProducts() {
    this.cartService.getProductDetails(0,0).pipe(
     untilDestroyed(this)
   ).subscribe(data =>{

      if(data) {
        this.products = data;
        console.log(this.products)  
      
        for(let i=0; i<this.products.length;i++){
          this.products[i].disabled = false
          let stocks = this.products[i].stocks
          console.log(stocks)

        
          if(stocks){
            for(let j=0; j<stocks.length;j++){
              let remaining = stocks[j].RemainingQuantity
              console.log(remaining)
  
              if(remaining <= 0) {
                console.log("small")
                this.products[i].disabled = true
              }
            }
          }

          else {
            this.products[i].disabled = true
          }

          if(!this.products[i].productPrices){
            this.products[i].disabled = true
          }
         
        }
      
      }
        
    })   
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  
  onChange(quantity,product, stocks) {

    this.selected_quant  = quantity;
    product.quantity = quantity

    console.log(this.selected_quant)
    console.log(product.quantity)
    console.log(product)
  
    if(stocks) {

      for(let i=0; i<stocks.length; i++) {
        if(this.selected_quant > stocks[i].RemainingQuantity){
  
          console.log(this.selected_quant)
          console.log(stocks[i].RemainingQuantity)
  
          console.log(this.selected_quant - stocks[i].RemainingQuantity)
          product.disabled = true
          console.log("quantity not available")
  
          this.presentAlert()
        }
  
        if(this.selected_quant <= stocks[i].RemainingQuantity){
          product.disabled = false
        }
      }
    }
    
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Quantity not available',
      message: 'Please, Try changing it.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async openPreview(image_url){
    console.log(image_url)
    
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        image_url : image_url
      }
    });
    return await modal.present();
    
  }

  moreSlides(event){
    console.log(event)
    console.log("load more")
  }

  /*
  openCart(){

    /*
        if(!this.mail && !this.business_name){
          this.router.navigate(['details'])
        }
    
        
        else {
          let navigationExtras : NavigationExtras ={
            state :{
              user_id : this.user_id
            }
          }
          this.router.navigate(['carts'], navigationExtras)
    
       // }
        
        
      }
      
    */  

  addToCart(product, price) {
  
    let x = product;
    this.price = price;

    let id = product.product_id;

    let added = false;
    
    if(this.user_id) {

      
      let obj = {
        date : new Date(),
        quantity : Number (product.quantity) || 1,
        price : this.price,
        user_id : this.user_id,
        product_id : id ,
        disabled : "false"

        
      }
     //  console.log(obj)

     this.cartService.getCartItems(this.user_id).pipe(untilDestroyed(this))
    .subscribe(data =>{
        console.log(data)

        this.cart = data

          if(this.cart != 'undefined' && this.cart.length > 0) {
            console.log("not empty")

              for(let p of this.cart) {
              
                console.log("product id from cart " + p.product.product_id)
                console.log("product id from html " + id)

                if(p.product.product_id === id) {
                  console.log("product exists so update")

              this.cartService.updatecartItem(this.user_id,p.cart_id, obj).pipe(untilDestroyed(this))
                .subscribe(data =>{
                    if(data) {
                      console.log(data)

                    }
                    else{
                      console.log("error")
                    }

                  })

                  added = true;
                  break;
                }

             
              }

              if(!added) {
                this.cartService.addTocart(obj).pipe(untilDestroyed(this))
                .subscribe( data =>{
                  console.log(data)

                    this.cartService.final_count(this.user_id)
                })
              }
          }

          else {
            console.log("empty")

          this.cartService.addTocart(obj).pipe(untilDestroyed(this))
          .subscribe( data => {
              if(data) {
                console.log(data)
              }

            })
          }

      })

     
    
    }
    else{
     
      console.log("bro")
      this.subscribe2 = this.userService.userid_behaviour.pipe(untilDestroyed(this))
      .subscribe(val =>{
        if(val != null) {
  
          console.log(val)
          this.user_id = val

          this.addToCart(product, price)
        }
      }) 

    }

  }

  ionViewWillLeave(){
      if(this.subscribe2 instanceof Subscription){
        console.log(this.subscribe2.closed)
        this.subscribe2.unsubscribe()
      }
    }
}
