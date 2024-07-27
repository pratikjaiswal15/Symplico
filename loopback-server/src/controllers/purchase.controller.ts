import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Purchase } from '../models';
import { PurchaseRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class PurchaseController {
  constructor(
    @repository(PurchaseRepository)
    public purchaseRepository: PurchaseRepository,
  ) { }

  @post('/purchases', {
    responses: {
      '200': {
        description: 'Purchase model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Purchase) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, { exclude: ['serial_no'] }),
        },
      },
    })
    purchase: Omit<Purchase, 'serial_no'>,
  ): Promise<Purchase> {
    return this.purchaseRepository.create(purchase);
  }

  @get('/purchases/count', {
    responses: {
      '200': {
        description: 'Purchase model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Purchase)) where?: Where<Purchase>,
  ): Promise<Count> {
    return this.purchaseRepository.count(where);
  }

  @get('/purchases', {
    responses: {
      '200': {
        description: 'Array of Purchase model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Purchase) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Purchase)) filter?: Filter<Purchase>,
  ): Promise<Purchase[]> {
    return this.purchaseRepository.find(filter);
  }

  @patch('/purchases', {
    responses: {
      '200': {
        description: 'Purchase PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, { partial: true }),
        },
      },
    })
    purchase: Purchase,
    @param.query.object('where', getWhereSchemaFor(Purchase)) where?: Where<Purchase>,
  ): Promise<Count> {
    return this.purchaseRepository.updateAll(purchase, where);
  }

  @get('/purchases/{id}', {
    responses: {
      '200': {
        description: 'Purchase model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Purchase) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Purchase))
    filter?: Filter<Purchase>,

  ): Promise<Purchase> {
    return this.purchaseRepository.findById(id, filter);
  }

  @patch('/purchases/{id}', {
    responses: {
      '204': {
        description: 'Purchase PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, { partial: true }),
        },
      },
    })
    purchase: Purchase,
  ): Promise<void> {
    await this.purchaseRepository.updateById(id, purchase);
  }

  @put('/purchases/{id}', {
    responses: {
      '204': {
        description: 'Purchase PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() purchase: Purchase,
  ): Promise<void> {
    await this.purchaseRepository.replaceById(id, purchase);
  }

  @del('/purchases/{id}', {
    responses: {
      '204': {
        description: 'Purchase DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.purchaseRepository.deleteById(id);
  }


  @get('/purchase_Seller', {
    responses: {
      '200': {
        description: 'Array of Purchase model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Purchase) },
          },
        },
      },
    },
  })
  async find_Seller(

  ): Promise<Purchase[]> {
    return this.purchaseRepository.find(
      {

        include: [{
          relation: 'purchaseProducts',
          scope: {
            include: [{ relation: 'products' }],
          }

        }, {

          relation: 'vendors',
          scope: {
            fields: { address_line1: false, city: false, state: false, pincode: false, gst_number: false, }
          }
        }]
      }
    );

  }

}
