import { CartService } from '../../services/cart.service'
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
 

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  cart  ;
  products = [];
  cartItemCount : any;

  quantity : any =[1,2,3,4,5,6,7,8,9,10,15,20,25,30,35,40,45,50,60,70,80,100];

  selected_quant = 1;

  public searchTerm: string = "";
  
  filter_products = [];  
  price ;

  firebase_id;
  user_id;
  id;
  count: any;  
  business_name : string;
  mail : string;

 
  constructor(private cartService: CartService, public productService : ProductService,
    public afauth: AngularFireAuth, public userService :UserService,public storageService : StorageService,
    private router: Router, public alertController :AlertController ) {

      this.userService.userid_behaviour.subscribe(val =>{
        if(val != null) {
  
          console.log(val)
          this.user_id = val
          this.getcartCount(this.user_id)
          console.log(this.user_id)          
        }
    
  
      })
   }



 
   ngOnInit() {


    this.getProducts() 
      
  }


  getProducts() {
    this.cartService.getProductDetails(0,0).subscribe(data =>{

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

  async getcartCount(id) {


      this.cartService.getCartCount(id).subscribe(data =>{
        //console.log(data)
  
        if(data) {
          this.cartItemCount = data
          this.count= this.cartItemCount.count
          console.log(this.count)
        }
         
      })
/*
      this.userService.getOneUser(id).subscribe(x => {
        console.log(x)
        console.log(x.email)
        this.mail = x.email
        console.log(x.business_name)
        this.business_name = x.business_name
      })
    */
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

      this.cartService.getCartItems(this.user_id).subscribe(data =>{
        console.log(data)

        this.cart = data

          if(this.cart != 'undefined' && this.cart.length > 0) {
            console.log("not empty")

              for(let p of this.cart) {
              
                console.log("product id from cart " + p.product.product_id)
                console.log("product id from html " + id)

                if(p.product.product_id === id) {
                  console.log("product exists so update")

                  this.cartService.updatecartItem(this.user_id,p.cart_id, obj).subscribe(data =>{
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
                this.cartService.addTocart(obj).subscribe( data =>{
                  console.log(data)
                    this.cartService.getCartCount(this.user_id).subscribe(data =>{
                      if(data) {
                        console.log(data)
                        this.cartItemCount = data
                        this.count = this.cartItemCount.count
                      }
                      else{
                        console.log("error")
                      }
                      
                    })
                })
              }
          }

          else {
            console.log("empty")

            this.cartService.addTocart(obj).subscribe( data => {
              if(data) {
                console.log(data)
                //  this.cartItemCount.next(this.cartItemCount.value + 1);
                this.cartService.getCartCount(this.user_id).subscribe(data =>{
                  if(data) {
                    this.cartItemCount = data
                    this.count = this.cartItemCount.count
                  }
                  else{
                    console.log("error")
                  }
                   
                })
              }

              else {
                console.log("error")
              }
           

            })
          }

      })

     
    
    }
    else{
     
      console.log("bro")
      this.getuser_id()
    }

  }

  openCart(){

/*
    if(!this.mail && !this.business_name){
      this.router.navigate(['details'])
    }
*/
    
  //  else {
      let navigationExtras : NavigationExtras ={
        state :{
          user_id : this.user_id
        }
      }
      this.router.navigate(['menu/items/carts'], navigationExtras)

   // }
    
    
  }
  
  
  

  getuser_id() {
    

    this.storageService.get('user_id').then(result => {
      if (result != null) {
      console.log('user_id : '+ result);
        this.user_id = Number(result);
    } 
    else {
      this.storageService.get('firebase_uid').then(result => {
        if (result != null) {
        console.log('firebase uid: '+ result);
          this.firebase_id = result;

          this.userService.findUserId(this.firebase_id).subscribe(q =>{
            console.log(q)
        
            if(q) {
              this.id = q;
                  for(let i =0; i<this.id.length;i++) {
                    this.user_id = this.id[i].id
                  }

                  this.storageService.set('user_id', this.user_id ).then(result => {
                    console.log('Data is saved');
                    }).catch(e => {
                    console.log("error: " + e);
                    });
            } 
            else {console.log("notfound")}
            
          })
      }

      else {
        this.afauth.authState.subscribe(user => {
          if(user) {
            this.firebase_id = user.uid

            this.storageService.set('firebase_uid', this.firebase_id ).then(result => {
              console.log('Data is saved');
              }).catch(e => {
              console.log("error: " + e);
              });

              this.userService.findUserId(this.firebase_id).subscribe(data  =>{
                if(data) {
                  this.id = data;
  
                        for(let i = 0 ;i<this.id.length; i++ ){
                          this.user_id = this.id[i].id
                        }

                        this.storageService.set('user_id', this.user_id ).then(result => {
                          console.log('Data is saved');
                          }).catch(e => {
                          console.log("error: " + e);
                          });     
                }

                else {
                  console.log("new user")
            
                }
              })

          }
        })
      }
     
        })
    }
  })
  }
  

}