import { inject } from '@loopback/context';
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import { FILE_UPLOAD_SERVICE } from '../keys';
import { FileUploadHandler } from '../types';
import * as fs from 'fs';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({ allowedRoles: ['admin'] })

export class ImageuploadController {

  /**
  * Constructor
  * @param handler - Inject an express request handler to deal with the request
  */
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler) { }


  @post('/api/upload', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          resolve(ImageuploadController.getFilesAndFields(request));
        }
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
      name: f.filename
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return { files, fields: request.body };
  }

  @post('/delete-image', {
    responses: {
      '204': {
        description: 'Image DELETE success',
      },
    },
  })

  async delete_file(
    @requestBody({}) request: any
  ): Promise<any> {

    console.log(request)
    if (fs.existsSync('uploads/' + request.image)) {
      console.log("file exist")

      fs.unlink('uploads/' + request.image, (err) => {
        if (err) throw (err);
        console.log('successfully deleted ' + request.image);

        return {
          success: true
        };
      })

    }

    else {
      console.log("file doen't exist")
      return {
        success: false
      };
    }
  }



}
