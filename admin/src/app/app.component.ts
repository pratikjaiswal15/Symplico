import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public authenticationService :AuthenticationService, private router : Router){
    this.initializeApp();
  }

  initializeApp(){
    
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['admin-dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
    
   }
  

}
