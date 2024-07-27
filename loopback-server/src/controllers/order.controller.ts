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
import { Orders } from '../models';
import { OrdersRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
export class OrderController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @post('/orders', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Orders) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrders',

          }),
        },
      },
    })
    orders: Orders,
  ): Promise<Orders> {
    return this.ordersRepository.create(orders);
  }

  @get('/orders/count', {
    responses: {
      '200': {
        description: 'Orders model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async count(
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.count(where);
  }

  @get('/orders', {
    responses: {
      '200': {
        description: 'Array of Orders model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orders, { includeRelations: true }),
            },
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Orders)) filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.ordersRepository.find(filter);
  }

  @patch('/orders', {
    responses: {
      '200': {
        description: 'Orders PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'], })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, { partial: true }),
        },
      },
    })
    orders: Orders,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.updateAll(orders, where);
  }

  @get('/orders/{id}', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orders, { includeRelations: true }),
          },
        },
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Orders)) filter?: Filter<Orders>
  ): Promise<Orders> {
    return this.ordersRepository.findById(id, filter);
  }

  @patch('/orders/{id}', {
    responses: {
      '204': {
        description: 'Orders PATCH success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, { partial: true }),
        },
      },
    })
    orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.updateById(id, orders);
  }

  @put('/orders/{id}', {
    responses: {
      '204': {
        description: 'Orders PUT success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.replaceById(id, orders);
  }

  @del('/orders/{id}', {
    responses: {
      '204': {
        description: 'Orders DELETE success',
      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordersRepository.deleteById(id);
  }



  @get('/finalorders', {
    responses: {
      '200': {
        description: 'Array of Orders model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orders, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  /*
    async Multiple(
      @param.query.object('filter', getFilterSchemaFor(Orders)) filter?: Filter<Orders>,
    ): Promise<Orders[]> {
      return this.ordersRepository.find(
        {
          include: [{
            relation: 'orderedProducts',
            scope: {
              include: [{
                relation: 'product', scope: {
                  fields: { product_id: true, name: true, image_url: true }
                }
              }]
            }
          }, {
            relation: 'users', scope: {
              fields: { id: true, mobile_no: true, email: true }
            }

          }, {
            relation: 'address'
          }
          ]
        }, filter);
    }
  */
  @authorize({ allowedRoles: ['admin'] })
  async Multiple_relation(
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    // combine 2 filters
    const myFilter = {
      ...filter, where: { or: [{ status: "placed" }, { status: "packed" }, { status: "shipped" }] }, include: [{
        relation: 'orderedProducts',
        scope: {
          include: [{
            relation: 'product', scope: {
              fields: { product_id: true, name: true, image_url: true }
            }
          }],
        },
      }, {
        relation: 'users', scope: {
          fields: { id: true, mobile_no: true, name: true, business_name: true }
        }
      }, {
        relation: 'address'
      }],
    };
    return this.ordersRepository.find(myFilter);

  }

  @get('/finalorders/count', {
    responses: {
      '200': {
        description: 'Count of Array of Orders model instances',
        content: { 'application/json': { schema: CountSchema } },

      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })
  async find_count(): Promise<Count> {
    const count = await (this.ordersRepository.find({ where: { or: [{ status: "placed" }, { status: "packed" }, { status: "shipped" }] } }))
    return { count: count.length }
  }


  @get('/pastorders', {
    responses: {
      '200': {
        description: 'Array of Orders model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orders, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  /*
    async Multiple(
      @param.query.object('filter', getFilterSchemaFor(Orders)) filter?: Filter<Orders>,
    ): Promise<Orders[]> {
      return this.ordersRepository.find(
        {
          include: [{
            relation: 'orderedProducts',
            scope: {
              include: [{
                relation: 'product', scope: {
                  fields: { product_id: true, name: true, image_url: true }
                }
              }]
            }
          }, {
            relation: 'users', scope: {
              fields: { id: true, mobile_no: true, email: true }
            }

          }, {
            relation: 'address'
          }
          ]
        }, filter);
    }
  */
  @authorize({ allowedRoles: ['admin'] })

  async past(
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    // combine 2 filters
    const myFilter = {
      ...filter, where: { or: [{ status: "delivered" }, { status: "canceled" }] }, include: [{
        relation: 'orderedProducts',
        scope: {
          include: [{
            relation: 'product', scope: {
              fields: { product_id: true, name: true, image_url: true }
            }
          }],
        },
      }, {
        relation: 'users', scope: {
          fields: { id: true, mobile_no: true, name: true, business_name: true }
        }
      }, {
        relation: 'address'
      }],
    };
    return this.ordersRepository.find(myFilter);

  }

  @get('/pastorders/count', {
    responses: {
      '200': {
        description: 'Count of Array of Orders model instances',
        content: { 'application/json': { schema: CountSchema } },

      },
    },
  })

  @authorize({ allowedRoles: ['admin'] })

  async past_count(): Promise<Count> {
    const count = await (this.ordersRepository.find({ where: { or: [{ status: "delivered" }, { status: "canceled" }] } }))
    return { count: count.length }
  }


}
