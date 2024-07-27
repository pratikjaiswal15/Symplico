import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, switchMap, take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { UntilDestroy } from '@ngneat/until-destroy';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from './services/authentication.service';

@UntilDestroy()
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(private authenticationService: AuthenticationService, public afauth: AngularFireAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.afauth.idToken.pipe(
      take(1), // <-------------- emit only the first value

      switchMap((token: any) => {
        console.log(token)
        
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });

        if (!request.headers.has('Content-Type')) {
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        return next.handle(request)
          .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              let errorMessage = '';
              if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `${error.error.message}`;

              } else {

                // console.log(error)
                switch (error.status) {
                  case 401: {
                    this.authenticationService.logout()
                  }
                  case 403:{
                    this.authenticationService.logout()
                  }
                  default:
                    window.alert(error.error.error.message)
                    return throwError(error);
                }
                // server-side error
                //  errorMessage = `${error.status}\n ${error.message}`;
              }
              //\  window.alert(errorMessage);
              //  return throwError(errorMessage);
            })
          )
      })

    );



  }
}


