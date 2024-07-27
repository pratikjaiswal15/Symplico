import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vendor,
  Purchase,
} from '../models';
import { VendorRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';


@authenticate('jwt')
export class VendorPurchaseController {
  constructor(
    @repository(VendorRepository) protected vendorRepository: VendorRepository,
  ) { }

  @get('/vendors/{id}/purchases', {
    responses: {
      '200': {
        description: 'Array of Purchase\'s belonging to Vendor',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Purchase) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Purchase>,
  ): Promise<Purchase[]> {
    return this.vendorRepository.purchases(id).find(filter);
  }

  @post('/vendors/{id}/purchases', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Purchase) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vendor.prototype.vendor_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, {
            exclude: ['serial_no'],
            optional: ['vendor_id']
          }),
        },
      },
    }) purchase: Omit<Purchase, 'serial_no'>,
  ): Promise<Purchase> {
    return this.vendorRepository.purchases(id).create(purchase);
  }

  @patch('/vendors/{id}/purchases', {
    responses: {
      '200': {
        description: 'Vendor.Purchase PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchase, { partial: true }),
        },
      },
    })
    purchase: Partial<Purchase>,
    @param.query.object('where', getWhereSchemaFor(Purchase)) where?: Where<Purchase>,
  ): Promise<Count> {
    return this.vendorRepository.purchases(id).patch(purchase, where);
  }

  @del('/vendors/{id}/purchases', {
    responses: {
      '200': {
        description: 'Vendor.Purchase DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Purchase)) where?: Where<Purchase>,
  ): Promise<Count> {
    return this.vendorRepository.purchases(id).delete(where);
  }


  @get('/vendors/{id}/final_purchases', {
    responses: {
      '200': {
        description: 'Array of Purchase\'s belonging to Vendor',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Purchase) },
          },
        },
      },
    },
  })
  async find_All(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Purchase>,
  ): Promise<Purchase[]> {

    const myFilter = {
      ...filter, include: [{
        relation: 'purchaseProducts',

        scope: {
          include: [{
            relation: 'products',
            scope: {
              fields: { product_id: true, name: true, unit: true }
            }
          }]
        }
      }]
    }
    return this.vendorRepository.purchases(id).find(myFilter);
  }


  @get('/vendors/{id}/fpurchases', {
    responses: {
      '200': {
        description: 'Array of Purchase\'s belonging to Vendor',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Purchase) },
          },
        },
      },
    },
  })
  async find_AllPur(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Purchase>,
  ): Promise<Purchase[]> {

    return this.vendorRepository.purchases(id).find({
      include: [{

        relation: 'purchaseProducts',
        scope: {
          fields: { id: false },
          include: [{
            relation: 'products',
            scope: {
              fields: { product_id: true, name: true }
            }
          }],

        },

      },

      ]
    });
  }



  @get('/vendors/{id}/final_purchases/count', {
    responses: {
      '200': {
        description: 'Count Array of Purchase\'s belonging to Vendor',
        content: { 'application/json': { schema: CountSchema } },

      },
    },
  })
  async find_count(
    @param.path.number('id') id: number,
  ): Promise<Count> {

    const count = await this.vendorRepository.purchases(id).find();
    return { count: count.length }
  }



}
