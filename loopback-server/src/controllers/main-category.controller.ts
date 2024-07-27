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
import { MainCategory } from '../models';
import { MainCategoryRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';


@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class MainCategoryController {
  constructor(
    @repository(MainCategoryRepository)
    public mainCategoryRepository: MainCategoryRepository,
  ) { }

  @post('/main-categories', {
    responses: {
      '200': {
        description: 'MainCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(MainCategory) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainCategory, { exclude: ['main_id'] }),
        },
      },
    })
    mainCategory: Omit<MainCategory, 'main_id'>,
  ): Promise<MainCategory> {
    return this.mainCategoryRepository.create(mainCategory);
  }

  @get('/main-categories/count', {
    responses: {
      '200': {
        description: 'MainCategory model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(MainCategory)) where?: Where<MainCategory>,
  ): Promise<Count> {
    return this.mainCategoryRepository.count(where);
  }

  @get('/main-categories', {
    responses: {
      '200': {
        description: 'Array of MainCategory model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(MainCategory) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(MainCategory)) filter?: Filter<MainCategory>,
  ): Promise<MainCategory[]> {
    return this.mainCategoryRepository.find(filter);
  }

  @patch('/main-categories', {
    responses: {
      '200': {
        description: 'MainCategory PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainCategory, { partial: true }),
        },
      },
    })
    mainCategory: MainCategory,
    @param.query.object('where', getWhereSchemaFor(MainCategory)) where?: Where<MainCategory>,
  ): Promise<Count> {
    return this.mainCategoryRepository.updateAll(mainCategory, where);
  }

  @get('/main-categories/{id}', {
    responses: {
      '200': {
        description: 'MainCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(MainCategory) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<MainCategory> {
    return this.mainCategoryRepository.findById(id);
  }

  @patch('/main-categories/{id}', {
    responses: {
      '204': {
        description: 'MainCategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainCategory, { partial: true }),
        },
      },
    })
    mainCategory: MainCategory,
  ): Promise<void> {
    await this.mainCategoryRepository.updateById(id, mainCategory);
  }

  @put('/main-categories/{id}', {
    responses: {
      '204': {
        description: 'MainCategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mainCategory: MainCategory,
  ): Promise<void> {
    await this.mainCategoryRepository.replaceById(id, mainCategory);
  }

  @del('/main-categories/{id}', {
    responses: {
      '204': {
        description: 'MainCategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mainCategoryRepository.deleteById(id);
  }
}
