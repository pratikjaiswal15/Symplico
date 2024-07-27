// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody,
// } from '@loopback/rest';
// import {
//   Users,
//   UserCredentials,
// } from '../models';
// import { UsersRepository } from '../repositories';
// import { authenticate } from '@loopback/authentication';


// @authenticate('jwt')
// export class UsersUserCredentialsController {
//   constructor(
//     @repository(UsersRepository) protected usersRepository: UsersRepository,
//   ) { }

//   @get('/users/{id}/user-credentials', {
//     responses: {
//       '200': {
//         description: 'Users has one UserCredentials',
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(UserCredentials),
//           },
//         },
//       },
//     },
//   })
//   async get(
//     @param.path.number('id') id: number,
//     @param.query.object('filter') filter?: Filter<UserCredentials>,
//   ): Promise<UserCredentials> {
//     return this.usersRepository.userCredentials(id).get(filter);
//   }

//   @post('/users/{id}/user-credentials', {
//     responses: {
//       '200': {
//         description: 'Users model instance',
//         content: { 'application/json': { schema: getModelSchemaRef(UserCredentials) } },
//       },
//     },
//   })


//   async create(
//     @param.path.number('id') id: typeof Users.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(UserCredentials, {
//             title: 'NewUserCredentialsInUsers',
//             exclude: ['id'],
//             optional: ['usersId']
//           }),
//         },
//       },
//     }) userCredentials: Omit<UserCredentials, 'id'>,
//   ): Promise<UserCredentials> {
//     return this.usersRepository.userCredentials(id).create(userCredentials);
//   }

//   @patch('/users/{id}/user-credentials', {
//     responses: {
//       '200': {
//         description: 'Users.UserCredentials PATCH success count',
//         content: { 'application/json': { schema: CountSchema } },
//       },
//     },
//   })
//   async patch(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(UserCredentials, { partial: true }),
//         },
//       },
//     })
//     userCredentials: Partial<UserCredentials>,
//     @param.query.object('where', getWhereSchemaFor(UserCredentials)) where?: Where<UserCredentials>,
//   ): Promise<Count> {
//     return this.usersRepository.userCredentials(id).patch(userCredentials, where);
//   }

//   @del('/users/{id}/user-credentials', {
//     responses: {
//       '200': {
//         description: 'Users.UserCredentials DELETE success count',
//         content: { 'application/json': { schema: CountSchema } },
//       },
//     },
//   })
//   async delete(
//     @param.path.number('id') id: number,
//     @param.query.object('where', getWhereSchemaFor(UserCredentials)) where?: Where<UserCredentials>,
//   ): Promise<Count> {
//     return this.usersRepository.userCredentials(id).delete(where);
//   }
// }
