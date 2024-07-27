import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router,public afauth: AngularFireAuth, public storageService : StorageService,
    private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  signout(){
    this.afauth.auth.signOut().then( () =>{
  
      this.authenticationService.logout().then(() =>{
        console.log("logout")
      })
    })
  }
}
