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
  Address,
  Orders,
} from '../models';
import { AddressRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class AddressOrdersController {
  constructor(
    @repository(AddressRepository) protected addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Orders\'s belonging to Address',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Orders) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.addressRepository.orders(id).find(filter);
  }

  @post('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Orders) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Address.prototype.address_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrdersInAddress',
            exclude: ['order_id'],
            optional: ['address_id']
          }),
        },
      },
    }) orders: Omit<Orders, 'order_id'>,
  ): Promise<Orders> {
    return this.addressRepository.orders(id).create(orders);
  }

  @patch('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Address.Orders PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, { partial: true }),
        },
      },
    })
    orders: Partial<Orders>,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.addressRepository.orders(id).patch(orders, where);
  }

  @del('/addresses/{id}/orders', {
    responses: {
      '200': {
        description: 'Address.Orders DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.addressRepository.orders(id).delete(where);
  }
}
