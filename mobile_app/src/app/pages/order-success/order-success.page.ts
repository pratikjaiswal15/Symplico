import { Component, OnInit } from '@angular/core';
import { OrdersapiService } from '../../services/ordersapi.service';
import { SellStockService } from 'src/app/services/sell-stock.service';
import { OurOrdersService } from 'src/app/services/our-orders.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import * as CryptoJS  from 'crypto-js';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {

  razorpay_payment_id : any;
  razorpay_order_id : any;

  user_id : any;
  products :any;
  quantity : any;
  product_id : any;
  total: any;
  index:any;
  rupees : string ="₹";
  delivery_address : any;
  pincode : any;
  address_id: any;
  address: any;
  default_Addressid : any;
  default_Address : any;

  constructor(public OrdersapiService : OrdersapiService, public sellStockService :SellStockService, public ourOrdersService : OurOrdersService,
    public cartService : CartService, private route: ActivatedRoute, public addressService : AddressService) { }

  ngOnInit() {

    console.log('order success')
    this.success()

  }

  
  success(){
/*   

    var key = "sesfsl1e24e2f3uyy9epi0rurtf62r3r";

    let x = this.route.snapshot.queryParamMap.get('valid')
    this.razorpay_payment_id = CryptoJS.AES.decrypt(x, key).toString(CryptoJS.enc.Utf8);
    console.log(this.razorpay_payment_id)

    let y = this.route.snapshot.queryParamMap.get('exact')
    this.razorpay_order_id = CryptoJS.AES.decrypt(y, key).toString(CryptoJS.enc.Utf8);
    console.log(this.razorpay_order_id)

    this.OrdersapiService.getOnePayment(this.razorpay_payment_id).subscribe(data =>{
     console.log(data)
      console.log(data.notes.status)

      this.user_id =  data.notes.user_id;
      this.address_id = data.notes.address_id
      this.delivery_address = data.notes.delivery_address;
      this.pincode = data.notes.pincode;

      if(!this.delivery_address) {
        this.addressService.getOneAddress(this.user_id, this.address_id).subscribe(x =>{
          console.log(x)
          this.address = x

          for(let a=0 ;a<this.address.length;a++){
            console.log(this.address[a].pincode)

            this.pincode = this.address[a].pincode
            this.delivery_address = [this.address[a].address_line1, this.address[a].address_line2, this.address[a].landmark,
            this.address[a].city, this.address[a].state, this.address[a].alternate_mobile_no].filter(Boolean).join(", ");
          
            console.log(this.pincode)
            console.log(this.delivery_address)
          }
        })
      }
      let x = new Date

      let orders = {
        order_id : this.unique('orders_'),
        date : x.toISOString(),
        razorpay_orderid : this.razorpay_order_id,
        razorpay_paymentid : this.razorpay_payment_id,
        status : data.notes.status,
        amount : ((data.amount) / 100 ),
        payment_type : data.method ,
        user_id :  Number(data.notes.user_id),
        address_id : Number (data.notes.address_id)

      }

      this.ourOrdersService.addOrder(orders).subscribe(data =>{
        console.log(data)
        console.log("odrders")

        if(data.status == 200 || data.status == 201 || data.status == 204) {

          
        this.total = (data.body.amount)
        console.log(this.total);

       this.update_addresses(this.user_id, this.address_id)
        

          this.cartService.getCartItems(this.user_id).subscribe(data =>{
            console.log(data)
            console.log("cart get")

            this.products = data

            this.index = this.products.length;

            for(let i=0;i <this.products.length;i++){

                this.quantity = this.products[i].quantity;
                this.product_id = this.products[i].product_id
                console.log(this.quantity)
                console.log(this.product_id)

                let orderProducts = {
                  quantity : this.products[i].quantity,
                  price : this.products[i].price,
                  product_id : this.products[i].product_id,
                  order_id : orders.order_id
                }


                let d = new Date
                

                this.ourOrdersService.postOrderedProducts(orderProducts).subscribe(data => {
                  console.log(data)
                  console.log("order products stored")

                  if(data.status == 200 || data.status == 201 || data.status == 204){

                    let sellStocks = {
                      sold_quantity : this.products[i].quantity,
                      sold_date : d.toISOString(),
                      product_id : this.products[i].product_id
          
                    }

                    this.sellStockService.AddSell_stock(this.products[i].product_id, sellStocks).subscribe(sell_Added =>{
                      console.log(sell_Added)
                  
                      console.log("added " + sell_Added.body.product_id)
                      console.log("sell stock")

                      if(sell_Added.status == 200 || sell_Added.status == 201 || sell_Added.status == 204) {

                        this.sellStockService.getRemaining_quantity(sell_Added.body.product_id).subscribe(val =>{
                          console.log(val)

                          let remaining = val;
                        // console.log("remaining " + remaining[i].RemainingQuantity)

                          for(let j=0; j<remaining.length;j++) {

                            let stock = {
                              RemainingQuantity : remaining[j].RemainingQuantity - this.products[i].quantity
                            }

                            console.log(stock)
                            this.sellStockService.Update_stock(sell_Added.body.product_id, stock).subscribe(result =>{
                              console.log(result)
                              console.log("stock updated")

                              
                            })

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

                })

              }

              else {
                console.log("not successful")
              }
            })

            
          })
        */      }

        /*
        update_addresses(user_id, address_id){
          this.addressService.getdefaultAddress(user_id).subscribe(data =>{
            console.log(data)
            this.address = data
            if(!data || !data.length){
              console.log("no default address")

              let dafault_true = {
                default : "true"
              }

              this.addressService.patchAddress(user_id,address_id,dafault_true).subscribe(def =>{
                console.log(def)
              })
            }
            else {
              console.log(" default address")
              console.log(this.address)

              for(let i=0; i<this.address.length;i++){

                this.default_Addressid = this.address[i].address_id
                console.log(this.default_Addressid)

                if(address_id == this.default_Addressid) {
                  console.log("same address")
                  return
                }

                else {
                  

                  this.addressService.patchAddress(user_id, this.default_Addressid, {default : "false"} ).subscribe(add =>{
                    console.log(add)
                  })

                

                 this.addressService.patchAddress(user_id,address_id, {default : "true"}).subscribe(s =>{
                   console.log(s)
                 })
                }

              }
            }
          
          })
        }

*/        
      }
