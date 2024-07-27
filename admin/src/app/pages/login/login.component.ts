import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from "@angular/fire/auth";

@UntilDestroy()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(public fb: FormBuilder, public authenticationService: AuthenticationService, public afAuth: AngularFireAuth) { }

  get email() {
    return this.loginForm.get('email')
  }


  get password() {
    return this.loginForm.get('password')
  }


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit() {

  }

  async login(email: string, password: string) {

    console.log('email', email, password)
    this.afAuth.signInWithEmailAndPassword(email, password).then(async data => {

      const { claims } = await data.user.getIdTokenResult()
      console.log(claims)
      if (claims.role == 'admin') {
        this.authenticationService.login()
      }
      else {
        alert('Not authorized')
        this.authenticationService.logout()
      }

    }).catch(err => {
      console.log(err)
      alert(err)
    })
  }


}
