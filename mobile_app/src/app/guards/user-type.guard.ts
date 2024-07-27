import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  user: string;

  constructor(public storageService: StorageService, private router : Router, public auth: AuthenticationService){}
  
  async canActivate() {

   this.user = await this.storageService.get('business_name')

   console.log(this.user)

    if(this.user !=null){
      return this.auth.isAuthenticated();
    }
    else{
      
      this.router.navigate(['user-type'])
      return false;
    }

  }
  
}
