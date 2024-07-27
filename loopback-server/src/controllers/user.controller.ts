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
  RestBindings,
  Request,
  HttpErrors
} from '@loopback/rest';
import { Users } from '../models';
import { UsersRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';
import _ from 'lodash';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/core';
import admin from '../services/admin';



export class UserController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(RestBindings.Http.REQUEST) private request: Request

  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { exclude: ['id'] }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<any> {

    users.role = 'customer'
    const token = await this.extractCredentials(
      this.request
    );

    if (token != 'null') {
      const fire_user = await admin.auth().verifyIdToken(token)
      await admin.auth().setCustomUserClaims(fire_user.uid, { role: users.role });

    }

    else {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    return this.usersRepository.create(users);
  }

  extractCredentials(request: Request): any {

    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    // for example : Basic Z2l6bW9AZ21haWwuY29tOnBhc3N3b3Jk
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }

    //split the string into 2 parts. We are interested in the base64 portion
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Basic xxyyzz' where xxyyzz is a base64 string.`,
      );
    const encryptedCredentails = parts[1];

    return encryptedCredentails
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })

  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'] })

  async count(
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Users) },
          },
        },
      },
    },
  })

  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'] })

  async find(
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
      },
    },
  })

  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'] })

  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    users: Users,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })

  @authenticate('jwt')

  async findById(@param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Users))
    filter?: Filter<Users>,
  )
    : Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PATCH success',
      },
    },
  })

  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })

  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })

  @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }


  @get('/whoIamI/{email}', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  //  @authenticate('jwt')
  async printCurrentUser(@param.path.string('email') email: string,

  ): Promise<any> {
    return this.usersRepository.findOne({ where: { email: email } })

  }



  // @post('/users/login', {
  //   responses: {
  //     '200': {
  //       description: 'Token',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               token: {
  //                 type: 'string',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async login(
  //   @requestBody(CredentialsRequestBody) credentials: Credentials,
  // ): Promise<{ token: string }> {
  //   // ensure the user exists, and the password is correct
  //   const user = await this.userService.verifyCredentials(credentials);

  //   // convert a User object into a UserProfile object (reduced set of properties)
  //   const userProfile = this.userService.convertToUserProfile(user);

  //   // create a JSON Web Token based on the user profile
  //   const token = await this.jwtService.generateToken(userProfile);

  //   return { token };
  // }


  // @get('/whoIamI', {
  //   security: OPERATION_SECURITY_SPEC,
  //   responses: {
  //     '200': {
  //       description: 'The current user profile',
  //       content: {
  //         'application/json': {
  //           schema: getModelSchemaRef(Users),
  //         },
  //       },
  //     },
  //   },
  // })
  // @authenticate('jwt')
  // async printCurrentUser(
  //   @inject(SecurityBindings.USER)
  //   currentUserProfile: UserProfile,
  // ): Promise<Users> {
  //   // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
  //   // for symbol property

  //   const userId = currentUserProfile[securityId];
  //   return this.usersRepository.findById(+userId);
  // }

  // /**
  //  * A login function that returns refresh token and access token.
  //  * @param credentials User email and password
  //  */
  // @post('/users/refresh-login', {
  //   responses: {
  //     '200': {
  //       description: 'Token',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               accessToken: {
  //                 type: 'string',
  //               },
  //               refreshToken: {
  //                 type: 'string',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async refreshLogin(
  //   @requestBody(CredentialsRequestBody) credentials: Credentials,
  // ): Promise<TokenObject> {
  //   // ensure the user exists, and the password is correct
  //   const user = await this.userService.verifyCredentials(credentials);
  //   // convert a User object into a UserProfile object (reduced set of properties)
  //   const userProfile: UserProfile = this.userService.convertToUserProfile(
  //     user,
  //   );
  //   const accessToken = await this.jwtService.generateToken(userProfile);
  //   const tokens = await this.refreshService.generateToken(
  //     userProfile,
  //     accessToken,
  //   );
  //   return tokens;
  // }

  // @post('/refresh', {
  //   responses: {
  //     '200': {
  //       description: 'Token',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               accessToken: {
  //                 type: 'object',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async refresh(
  //   @requestBody(RefreshGrantRequestBody) refreshGrant: RefreshGrant,
  // ): Promise<TokenObject> {
  //   return this.refreshService.refreshToken(refreshGrant.refreshToken);
  // }

}
