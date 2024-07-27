// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { get, post, requestBody, param } from '@loopback/rest';
import Razorpay from 'razorpay';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';


const razor = new Razorpay({
  key_id: 'rzp_test_rHtoop1fZXneoh',
  key_secret: 'Rle0yzx7WK93CKaeCufQGnA6',
});

@authenticate('jwt')
export class RazorOrdersController {
  constructor() { }

  @get('/ordersapi', {
    responses: {
      '200': {
        description: 'All razor orders',
        content:
          'application/json'

      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find_order() {
    return await razor.orders.all()
  }

  @post('/ordersapi', {
    responses: {
      '200': {
        description: 'Request to razor order',
      },
    },
  })
  async create(
    @requestBody({}) product: any
  ): Promise<any> {
    return await razor.orders.create(product)
  }

  @get('/ordersapi/{id}', {
    responses: {
      '200': {
        description: 'Single instance of razor order',
        content:
          'application/json'
      },
    },
  })

  async find_one(@param.path.string('id') id: string) {
    return await razor.orders.fetch(id)
  }

  @get('/ordersapi/{id}/payments', {
    responses: {
      '200': {
        description: 'Payments belonging to order',
        content:
          'application/json'
      },
    },
  })

  async find_payments(@param.path.string('id') id: string) {
    return await razor.orders.fetchPayments(id)
  }

}
