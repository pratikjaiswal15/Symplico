import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(public afAuth:  AngularFireAuth) { 
    this.checkToken();
  }

  async checkToken(){

    const token = await localStorage.getItem('token')
    if(token !=null || token != undefined){
      this.authenticationState.next(true)
    }

    else {
      this.authenticationState.next(false)
    }

  }


  async login() {

    await localStorage.setItem('token', 'my-token')
    this.authenticationState.next(true)   
  }
 
  async logout() {
    await this.afAuth.signOut();
    await localStorage.clear()
    this.authenticationState.next(false)
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

}
