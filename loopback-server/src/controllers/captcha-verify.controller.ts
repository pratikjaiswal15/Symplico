// Uncomment these imports to begin using these cool features!

import { post, requestBody, RestBindings, HttpErrors } from '@loopback/rest';
import axios from 'axios'
import { inject } from '@loopback/context';
import { Request } from '@loopback/rest'


export class CaptchaVerifyController {
  constructor(@inject(RestBindings.Http.REQUEST) private request: Request) { }

  @post('/capcha-verify/check', {
    responses: {
      '204': {
        description: 'Validate capcha',
      },
    },
  })

  async validate(
    @requestBody({}) req: any) {

    console.log(req)
    console.log("CAPTCHA middleware activated");
    console.log(this.request.connection.remoteAddress)
    let urlEncodedData = 'secret=6LdXNt8UAAAAAEd0IH3mcl91TdYgyXaw6VhThxgw&response=' + req.captchaResponse + '&remoteip=' + this.request.connection.remoteAddress;

    axios.post('https://www.google.com/recaptcha/api/siteverify', urlEncodedData, {

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {

      if (response.data.success) {
        console.log("verified")
        return "success"

      } else {
        throw new HttpErrors.Unauthorized('No bots');
      }
    })

  }
}
