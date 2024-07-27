import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  map,
  catchError,
  retryWhen,
  delay,
  tap,
  finalize,
  switchMap,
  take
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { AuthenticationService } from '../services/authentication.service';

import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  loaderToShow: any;

  constructor(
    private alertCtrl: AlertController,
    private loading: LoadingService,
    private authenticationService: AuthenticationService,
    public afauth: AngularFireAuth
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // YOU CAN ALSO DO THIS
    // const token = this.authenticationService.getToke()

    this.loading.present()

    return this.afauth.idToken.pipe(
      take(1), // <-------------- emit only the first value

      switchMap((token: any) => {
        
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });

        if (!request.headers.has('Content-Type')) {
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        return next.handle(request).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse) {

              console.log(err)
              console.log(request.headers)
              switch ((<HttpErrorResponse>err).status) {
                case 401:
                  this.authenticationService.logout();;
                 case 403 : 
                 this.authenticationService.logout(); 
                default:
                  return throwError(err);
              }
            } else {
              return throwError(err);
            }
          }),
          retryWhen(err => {
            let retries = 1;
            return err.pipe(
              delay(1000),
              tap(() => {
    //            this.showRetryToast(retries);
              }),
              map(error => {
                if (retries++ === 3) {
                  throw error; // Now retryWhen completes
                }
                return error;
              })
            );
          }),

         catchError((error: HttpErrorResponse) => {

          const status =  error.status;        
          console.log(error.error.error.message)

          this.presentAlert(status, error.error.error.message);
          this.loading.dismiss()

          return throwError(error);

        }),
          finalize(() => {
            this.loading.dismiss()
          })
      );
      })

    );
  

  }

  async presentAlert(status, reason) {
    const alert = await this.alertCtrl.create({
      header: ' Error code ' + status  ,
      message: reason,
      buttons: ['OK']
    });

    await alert.present();
  }
   
}