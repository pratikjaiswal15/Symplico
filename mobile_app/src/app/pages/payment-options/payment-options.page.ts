import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { TotalService } from 'src/app/services/total.service';
import { HttpClient } from '@angular/common/http';
import { AddressService } from 'src/app/services/address.service';
import { SellStockService } from 'src/app/services/sell-stock.service';
import { OurOrdersService } from 'src/app/services/our-orders.service';
import { OrdersapiService } from '../../services/ordersapi.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, forkJoin } from 'rxjs';
//import hyperid from 'hyperid';
import cuid from 'cuid';
import { map, mergeMap } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;


declare var RazorpayCheckout: any;

@UntilDestroy()
@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {

  total: any;
  user_id1: any;
  cart: any;
  delivery: any;
  check: any;
  address_id: number;
  service_address: number;
  concat: any;
  pincode: any;
  display_captcha: boolean = false;
  all_options: boolean = true;

  captchaPassed: boolean = false;
  captchaResponse: string;
  spinner: boolean = false;
  address: any;
  default_Addressid: any;
  products: any;
  index: number;
  product_id: number;
  quantity: number;
  show_success: boolean;
  rupees: string = "₹";
  subscribe1: Subscription
  phone_number: string;
  email: string;
  browser : boolean ;


  constructor(private route: ActivatedRoute, private router: Router, public storageService: StorageService,
    public cartService: CartService, public userService: UserService, public afauth: AngularFireAuth, public totalService: TotalService,
    private http: HttpClient, private zone: NgZone, public addressService: AddressService, public ordersapiService: OrdersapiService, public sellStockService: SellStockService, public ourOrdersService: OurOrdersService,
    private platform: Platform) {

    this.delivery = 15

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
        if (x) {
          this.address_id = x
        }
        else {
          this.storageService.get('address_id').then(val => {
            console.log(val)
            this.address_id = val
          })
        }

      }

    });
  }
  async test(){
  //await Browser.open({url : 'http://localhost:8100/tabs/tab2', windowName : '_'});

}
  async ngOnInit() {


    if(this.platform.is('cordova')){
      console.log('mobile')
      this.browser = false
      
    }
    else {
      console.log('browser')
      this.browser= true
      if(this.browser){
       // await Browser.open({url : 'http://localhost:8100/tabs/tab5/payment-options', windowName: '_self'});

      }
    }

    this.storageService.get('mobile_no').then(data => {
      if (data != null) {
        console.log(data)
        this.phone_number = data
      }

    })
    this.storageService.get('email').then(data => {
      if (data != null) {
        console.log(data)
        this.email = data
      }

    })

    this.validate()

  }



  async validate() {
    if (this.total) {
      console.log(this.total)
      console.log(this.user_id1)
      console.log(this.address_id)
    }
    else {

      this.check = this.totalService.get_grandTotal()
      if (this.check) {
        this.total = this.check
      }
      else {
        this.getuser_id(this.user_id1)

      }

      let address = this.totalService.getAddress_id()
      if (address) {
        this.address_id = address

      }



    }

  }


  getTotal(cart) {

    let price = cart.reduce((i, j) => i + j.price * j.quantity, 0);
    console.log("price" + price)
    this.total = price + this.delivery
    console.log(this.total)
  }

  async getuser_id(user_id) {
    if (user_id) {
      this.user_id1 = user_id
      this.cartService.getCartItems(user_id).pipe(
        untilDestroyed(this)
      ).subscribe(data => {
        if (data) {
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
      this.userService.userid_behaviour.pipe(
        untilDestroyed(this)
      ).subscribe(val => {
        if (val) {
          this.user_id1 = val
          console.log("behave" + this.user_id1)

          this.getuser_id(this.user_id1)
        }
      })

    }

  }
  card() {

    if (this.phone_number && this.email) {
      console.log("clicked")

      var order_options = {
        amount: (this.total * 100),
        currency: "INR",
        receipt: cuid(),
        payment_capture: '1'
      };


      console.log(order_options)
      this.ordersapiService.CaptureOrder(order_options).pipe(
        untilDestroyed(this)
      ).subscribe(async data => {
        console.log(data)

        let order_id = data.id

        var options = {
          description: 'Customer payment',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: "INR", // your 3 letter currency code
          key: "rzp_test_rHtoop1fZXneoh", // your Key Id from Razorpay dashboard
          order_id: order_id,
          amount: (this.total * 100), // Payment amount in smallest denomiation e.g. cents for USD
          //  name: 'Razorpay',
          prefill: {
            email: this.email,
            contact: this.phone_number,
            // name: 'Razorpay',
            method: 'card'
          },
          theme: {
            color: '#F37254'
          }
        };

        var successCallback = (success) =>{
        //  alert('payment_id: ' + success.razorpay_payment_id)
          var orderId = success.razorpay_order_id
          var signature = success.razorpay_signature

          let payment_type = 'card'

          this.store_order_razor(success.razorpay_payment_id, success.razorpay_order_id, payment_type)

        }

        var cancelCallback = function (error) {
          alert(error.description + ' (Error ' + error.code + ')')
        }


        
        RazorpayCheckout.on('payment.success', successCallback)
        RazorpayCheckout.on('payment.cancel', cancelCallback)
        RazorpayCheckout.open(options)

      })

    }
    else {
      this.afauth.user
        .pipe(untilDestroyed(this))
        .subscribe(user => {
          if (user) {
            console.log(user)
            this.phone_number = user.phoneNumber
            this.email = user.email

            this.card()
          }
        })
    }


  }

  netbanking() {

    if (this.phone_number && this.email) {

      console.log("clicked")

      var order_options = {
        amount: (this.total * 100),
        currency: "INR",
        receipt: cuid(),
        payment_capture: '1'
      };


      console.log(order_options)

      this.ordersapiService.CaptureOrder(order_options).pipe(
        untilDestroyed(this)
      ).subscribe(data => {
        console.log(data)

        let order_id = data.id

        var options = {
          description: 'Customer payment',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: "INR", // your 3 letter currency code
          key: "rzp_test_rHtoop1fZXneoh", // your Key Id from Razorpay dashboard
          order_id: order_id,
          amount: (this.total * 100), // Payment amount in smallest denomiation e.g. cents for USD
          //  name: 'Razorpay',
          prefill: {
            email: this.email,
            contact: this.phone_number,
            // name: 'Razorpay',
            method: 'netbanking'
          },
          theme: {
            color: '#F37254'
          }
        };

        var successCallback = (success) => {
          //   alert('payment_id: ' + success.razorpay_payment_id)
          //alert('success')
          var orderId = success.razorpay_order_id
          var signature = success.razorpay_signature
          console.log(`order_i ${orderId} signature ${signature}`)

          let payment_type = 'netbanking'

          this.store_order_razor(success.razorpay_payment_id, success.razorpay_order_id, payment_type)

        }

        var cancelCallback = function (error) {
          alert(error.description + ' (Error ' + error.code + ')')
        }

        RazorpayCheckout.on('payment.success', successCallback)
        RazorpayCheckout.on('payment.cancel', cancelCallback)
        RazorpayCheckout.open(options)


      })


    }

    else {
      this.afauth.user
        .pipe(untilDestroyed(this))
        .subscribe(user => {
          if (user) {
            console.log(user)
            this.phone_number = user.phoneNumber
            this.email = user.email

            this.netbanking()
          }
        })
    }
  }


  upi() {

    if (this.phone_number && this.email) {

      console.log("clicked")

      var order_options = {
        amount: (this.total * 100),
        currency: "INR",
        receipt: cuid(),
        payment_capture: '1'
      };


      console.log(order_options)

      this.ordersapiService.CaptureOrder(order_options).pipe(
        untilDestroyed(this)
      ).subscribe(data => {
        console.log(data)

        let order_id = data.id

        var options = {
          description: 'Customer payment',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: "INR", // your 3 letter currency code
          key: "rzp_test_rHtoop1fZXneoh", // your Key Id from Razorpay dashboard
          order_id: order_id,
          amount: (this.total * 100), // Payment amount in smallest denomiation e.g. cents for USD
          //  name: 'Razorpay',
          prefill: {
            email: this.email,
            contact: this.phone_number,
            // name: 'Razorpay',
            method: 'upi'
          },
          theme: {
            color: '#F37254'
          }
        };

        var successCallback = function (success) {
          //     alert('payment_id: ' + success.razorpay_payment_id)
          var orderId = success.razorpay_order_id
          var signature = success.razorpay_signature
          console.log(`order_id ${orderId} signature ${signature}`)

          let payment_type = 'upi'
          this.store_order_razor(success.razorpay_payment_id, success.razorpay_order_id, payment_type)


        }

        var cancelCallback = function (error) {
          alert(error.description + ' (Error ' + error.code + ')')
        }

        RazorpayCheckout.on('payment.success', successCallback)
        RazorpayCheckout.on('payment.cancel', cancelCallback)
        RazorpayCheckout.open(options)


      })

    }
    else {
      this.afauth.user
        .pipe(untilDestroyed(this))
        .subscribe(user => {
          if (user) {
            console.log(user)
            this.phone_number = user.phoneNumber
            this.email = user.email

            this.upi()
          }
        })
    }
  }

  store_order_razor(payment_id, order_id, payment_type) {

    //   alert("success from razor")

    this.show_address()

    let orders = {
      order_id: cuid(),
      date: new Date().toISOString(),
      razorpay_orderid: order_id,
      razorpay_paymentid: payment_id,
      status: "placed",
      amount: this.total,
      payment_type: payment_type,
      user_id: Number(this.user_id1),
      address_id: Number(this.address_id)

    }

    console.log(orders)

    this.in_database(orders)


    
  }

  cash() {
    console.log("cash")
    this.display_captcha = true
    this.all_options = false
    this.spinner = true

    setTimeout(() => {
      this.spinner = false
    }, 2000)
  }

  captchaResolved(response: string): void {

    this.spinner = false
    this.zone.run(() => {
      this.captchaPassed = true;
      this.captchaResponse = response;
    });

  }

  sendForm(): void {
    
    let data = {
      captchaResponse: this.captchaResponse
    };

    console.log(data)
    this.http.post('http://localhost:3000/capcha-verify/check', data, { observe: 'response' }).pipe(
      untilDestroyed(this)
    ).subscribe(res => {

      console.log(res);
      console.log(res.status)

      if (res.status == 204) {
        console.log("success")
        this.place_order()

      }

      else {
        alert('Please try again')
      }


    });

  }



  show_address(){
    console.log(this.concat)

    if (!this.concat) {
      this.addressService.getOneAddress(this.user_id1, this.address_id)
      .pipe(untilDestroyed(this))
      .subscribe(x => {
        console.log(x)
        this.address = x

        for (let a = 0; a < this.address.length; a++) {
          console.log(this.address[a].pincode)

          this.pincode = this.address[a].pincode
          this.concat = [this.address[a].address_line1, this.address[a].address_line2, this.address[a].landmark,
          this.address[a].city, this.address[a].state, this.address[a].alternate_mobile_no].filter(Boolean).join(", ");

          console.log(this.pincode)
          console.log(this.concat)
        }
      })
    }
  }


  place_order() {
    
    this.show_address()
    let x = new Date

    let orders = {
      order_id: cuid(),
      date: x.toISOString(),
      status: "placed",
      amount: this.total,
      payment_type: "cash on delivery",
      user_id: this.user_id1,
      address_id: this.address_id

    }

    console.log(orders)

    this.in_database(orders)

  }


  in_database(orders){


    this.ourOrdersService.addOrder(orders)
    .pipe(untilDestroyed(this))
    .subscribe(data => {
      console.log(data)
      console.log("odrders")

      if (data.status == 200 || data.status == 201 || data.status == 204) {
        this.update_addresses(this.user_id1, this.address_id)

        this.show_success = true

        this.display_captcha = false

        this.cartService.getCartItems(this.user_id1)
        .pipe(untilDestroyed(this))
        .subscribe(data => {
          console.log(data)
          console.log("cart get")


          this.products = data

          this.index = this.products.length;

          for (let i = 0; i < this.products.length; i++) {

            this.quantity = this.products[i].quantity;
            this.product_id = this.products[i].product_id
            console.log(this.quantity)
            console.log(this.product_id)


            let orderProducts = {
              quantity: this.products[i].quantity,
              price: this.products[i].price,
              product_id: this.products[i].product_id,
              order_id: orders.order_id
            }

            console.log(orderProducts)

            let d = new Date
            this.ourOrdersService.postOrderedProducts(orderProducts)
            .pipe(untilDestroyed(this))
            .subscribe(data => {
              console.log(data)
              console.log("order products stored")

              if (data.status == 200 || data.status == 201 || data.status == 204) {

                let sellStocks = {
                  sold_quantity: this.products[i].quantity,
                  sold_date: d.toISOString(),
                  product_id: this.products[i].product_id

                }

                this.sellStockService.AddSell_stock(this.products[i].product_id, sellStocks)
                .pipe(untilDestroyed(this))
                .subscribe(sell_Added => {
                  console.log(sell_Added)

                  console.log("added " + sell_Added.body.product_id)
                  console.log("sell stock")

                  if (sell_Added.status == 200 || sell_Added.status == 201 || sell_Added.status == 204) {

                    this.sellStockService.getRemaining_quantity(sell_Added.body.product_id)
                    .pipe(untilDestroyed(this))
                    .subscribe(val => {
                      console.log(val)

                      let remaining = val;

                      for (let j = 0; j < remaining.length; j++) {

                        let stock = {
                          RemainingQuantity: remaining[j].RemainingQuantity - this.products[i].quantity
                        }

                        console.log(stock)
                        this.sellStockService.Update_stock(sell_Added.body.product_id, stock)
                        .pipe(untilDestroyed(this))
                        .subscribe(result => {
                          console.log(result)
                          console.log("stock updated")


                        })

                      }

                    })

                  }
                })

              }
            })
          }
        })

      }
      else {
        console.log("error")
      }
    })
  }
  update_addresses(user_id, address_id) {

    this.addressService.getdefaultAddress(user_id)
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        console.log(data)
        this.address = data
        if (!data || !data.length) {
          console.log("no default address")

          let dafault_true = {
            default: "true"
          }

          this.addressService.patchAddress(user_id, address_id, dafault_true)
            .pipe(untilDestroyed(this))
            .subscribe(def => {
              console.log(def)
            })
        }
        else {
          console.log(" default address")
          console.log(this.address)

          for (let i = 0; i < this.address.length; i++) {

            this.default_Addressid = this.address[i].address_id
            console.log(this.default_Addressid)

            if (address_id == this.default_Addressid) {
              console.log("same address")
              return
            }

            else {

              this.addressService.patchAddress(user_id, this.default_Addressid, { default: "false" })
                .pipe(untilDestroyed(this))
                .subscribe(add => {
                  console.log(add)
                })


              this.addressService.patchAddress(user_id, address_id, { default: "true" })
              .pipe(untilDestroyed(this))
              .subscribe(s => {
                console.log(s)
              })
            }

          }
        }

      })
  }

  ionViewWillLeave() {
    this.subscribe1.unsubscribe()
  }
}
