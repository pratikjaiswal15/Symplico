import { AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer } from '@loopback/authorization';
import { inject, Provider } from '@loopback/core';
import { repository } from '@loopback/repository';
import { RestBindings, Request, HttpErrors } from '@loopback/rest';
import _ from 'lodash';
import { UsersRepository } from '../repositories';
import admin from './admin';

export class MyAuthorizationProvider implements Provider<Authorizer> {
  constructor(@inject(RestBindings.Http.REQUEST) private request: Request,
    @repository(UsersRepository)
    public userRepository: UsersRepository,) { }

  /**
   * @returns authenticateFn
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {

    let currentUser: any;

    const token = await this.extractCredentials(
      this.request
    );


    if (token != 'null') {
      const { role, email } = await admin.auth().verifyIdToken(token)
      console.log(role, email)

      if (role) {

        if (!role) {
          console.log('no role firebase')
          return AuthorizationDecision.DENY;
        }

        if (
          role.includes('admin') ||
          role.includes('suppoyrt')
        ) {
          console.log('admin firebase')
          return AuthorizationDecision.ALLOW;
        }

        if (metadata.allowedRoles!.includes(role)) {
          console.log(' allowed firebase')
          return AuthorizationDecision.ALLOW;
        }

        else {
          console.log('not allowed firebase')
          return AuthorizationDecision.DENY;
        }

      }

      else {
        currentUser = await this.userRepository.find({ where: { email: email } })

        console.log(currentUser)
        for (let i = 0; i < currentUser.length; i++) {
          console.log(currentUser[i].role)

          // Admin and support accounts bypass id verification
          if (
            currentUser[i].role.includes('admin') ||
            currentUser[i].role.includes('support')
          ) {
            console.log('admin')
            return AuthorizationDecision.ALLOW;
          }

          if (currentUser[i].id === authorizationCtx.invocationContext.args[0]) {
            console.log('id things')
            return AuthorizationDecision.ALLOW;
          }


          if (!currentUser[i].role) {
            console.log('no role')
            return AuthorizationDecision.DENY;
          }

          if (metadata.allowedRoles!.includes(currentUser[i].role)) {
            console.log(' allowed')
            return AuthorizationDecision.ALLOW;
          }

          else {
            console.log('not allowed')
            return AuthorizationDecision.DENY;
          }


        }
      }



    }
    else {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }


    // Authorize everything that does not have a allowedRoles property
    if (!metadata.allowedRoles) {
      console.log('no metadata')
      return AuthorizationDecision.ALLOW;
    }

    // let roleIsAllowed = false;
    // const role = currentUser.role
    // // for (const role of currentUser.roles) {
    // if (metadata.allowedRoles!.includes(role)) {
    //   roleIsAllowed = true;
    //   // }
    // }

    // if (!roleIsAllowed) {
    //   console.log('not allowd')
    //   return AuthorizationDecision.DENY;
    // }



    /**
     * Allow access only to model owners, using route as source of truth
     *
     * eg. @post('/users/{userId}/orders', ...) returns `userId` as args[0]
     */


    return AuthorizationDecision.DENY;

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


}
