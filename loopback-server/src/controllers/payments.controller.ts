// Uncomment these imports to begin using these cool features!

import { get, post, requestBody, param, RestBindings, HttpErrors } from '@loopback/rest';
import Razorpay from 'razorpay';
import { inject } from '@loopback/core';
import { Response } from '@loopback/rest'
import * as CryptoJS from 'crypto-js';
import * as querystring from 'querystring'
import { authorize } from '@loopback/authorization';

export interface payment {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const razor = new Razorpay({
  key_id: 'rzp_test_rHtoop1fZXneoh',
  key_secret: 'Rle0yzx7WK93CKaeCufQGnA6',
});

export class PaymentsController {
  constructor() { }


  @get('/payments', {
    responses: {
      '200': {
        description: 'All razor payments',
        content:
          'application/json'

      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async allPayments() {
    return await razor.payments.all()
  }

  @post('/payments', {
    responses: {
      '200': {
        description: 'Post payments',
      },
    },
  })
  async create(
    @requestBody({}) product: any
  ): Promise<any> {

    return product
  }


  @get('/payments/{id}', {
    responses: {
      '200': {
        description: 'Single instance of razor payment',
        content:
          'application/json'
      },
    },
  })

  async find_one(@param.path.string('id') id: string) {
    return await razor.payments.fetch(id)
  }

  @post('/payment-check', {
    responses: {
      '200': {
        description: 'Verify signature',
      },
    },
  })

  async check(
    @requestBody({
      content: {
        'application/x-www-form-urlencoded': {
          schema: { type: 'object' },
        }
      }
    }) options: payment, @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<any> {

    console.log(options)
    let secret = 'Rle0yzx7WK93CKaeCufQGnA6'
    console.log(options.razorpay_order_id + "|" + options.razorpay_payment_id, secret)

    console.log(options.razorpay_order_id + "|" + options.razorpay_payment_id, secret)
    let generated_signature = CryptoJS.HmacSHA256(options.razorpay_order_id + "|" + options.razorpay_payment_id, secret).toString(CryptoJS.enc.Hex);
    console.log(generated_signature)

    if (generated_signature == options.razorpay_signature) {

      console.log("matched")

      var key = "sesfsl1e24e2f3uyy9epi0rurtf62r3r";
      console.log(key.length)
      let order = CryptoJS.AES.encrypt(options.razorpay_order_id, key)
      let pay = CryptoJS.AES.encrypt(options.razorpay_payment_id, key)


      var payment_id = pay.toString()
      var order_id = order.toString()

      console.log(payment_id)
      console.log(order_id)
      /*
            let data = {
              paymen_id: payment_id,
              order_id: order_id
            }

            console.log(data)
            return data;
        */

      const query = querystring.stringify({
        "valid": payment_id,
        "exact": order_id
      });
      console.log(query)

      response.redirect('http://localhost:8100/order-success?' + query)


    }

    else {
      console.log("not matched")
      throw new HttpErrors.Forbidden('Payment forbidden');

    }

  }


}
