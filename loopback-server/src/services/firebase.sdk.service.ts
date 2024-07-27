
import { asAuthStrategy, AuthenticationStrategy } from '@loopback/authentication';
import { bind } from '@loopback/core';
import { repository } from '@loopback/repository';
import {
  asSpecEnhancer,
  HttpErrors, mergeSecuritySchemeToSpec, OASEnhancer,
  OpenApiSpec, Request
} from '@loopback/rest';
import { UsersRepository } from '../repositories/users.repository';
import admin from './admin';

@bind(asAuthStrategy, asSpecEnhancer)

export class FirebaseAdminStrategy
  implements AuthenticationStrategy, OASEnhancer {
  name = 'jwt';

  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository,
  ) { }


  async authenticate(request: Request): Promise<any | undefined> {

    const credentials: string = await this.extractCredentials(
      request
    );

    if (credentials != 'null') {
      const user = await admin.auth().verifyIdToken(credentials)
      const userProfile = await this.userRepository.find({ where: { email: user.email } })
      return userProfile
    }
    else {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

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


  modifySpec(spec: OpenApiSpec): OpenApiSpec {
    return mergeSecuritySchemeToSpec(spec, this.name, {
      type: 'http',
      scheme: 'basic',
    }); null
  }


}
