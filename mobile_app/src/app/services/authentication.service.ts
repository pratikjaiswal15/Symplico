import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../services/storage.service'
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storageservice: StorageService, private plt: Platform, private router: Router, public afauth: AngularFireAuth,
    private http : HttpClient, public UrlService : UrlService) {

    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   checkToken() {
    this.storageservice.get('token').then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login() {

    console.log("login")
    return this.storageservice.set('token', 'my-token').then(() => {
      this.authenticationState.next(true);
    });
  }

  next(){
    this.authenticationState.next(true);
  }
 
  async logout() {
     
    await this.afauth.signOut()
    await this.storageservice.clear()
    await this.authenticationState.next(false)
    
    let navigationExtras : NavigationExtras = {
      state : {
        logout : "yes"
      }
    }
    this.router.navigate(['home'], navigationExtras)
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

  current_user(email):Observable<any>{
    return this.http.get<any>(`${this.UrlService.url}/whoIamI/${email}`)
  }
}
