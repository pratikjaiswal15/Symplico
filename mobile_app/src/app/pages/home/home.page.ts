import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FormControl, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { isEmpty } from "lodash"
import { HttpClient } from '@angular/common/http';

declare var SMSReceive: any;

@UntilDestroy()

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  code: any;
  result: any;
  response: firebase.User;
  mobile_no = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])

  otp = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])



  otpArray: any = {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: ''
  }
  display_phone: boolean;
  disply_mail: boolean;
  display_otp: boolean;

  subscibe1: Subscription

  constructor(public afauth: AngularFireAuth, private router: Router, public userService: UserService,
    private authenticationService: AuthenticationService, public storageService: StorageService, private googlePlus: GooglePlus,
    public cd: ChangeDetectorRef, public alertController: AlertController, private route: ActivatedRoute,
    private plaform: Platform, private http: HttpClient) {
    this.display_phone = false;
    this.disply_mail = true;
    this.display_otp = false
  }



  ngOnInit() {

    
    // this.http.get(' http://192.168.43.147:3000/products').subscribe(data => console.log(data))
    this.subscibe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        if (this.router.getCurrentNavigation().extras.state.logout) {
          this.disply_mail = true
          this.display_otp = false
          this.display_phone = false

        }

      }
    })
  }

  show_phone() {
    this.disply_mail = false
    this.display_phone = true

  }

  login() {

    if (this.plaform.is('capacitor')) {
      console.log('android')

      this.googlePlus.login({
        'webClientId': '186456784012-fk40cv2c9cqaeg5hjd8lam7r7sle3295.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        console.log(res)
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

        this.afauth.signInWithCredential(googleCredential).then(response => {
          this.handle_user(response)
          
        })

      })
        .catch(err => {
          console.error(err)
          this.presentAlert(JSON.stringify(err))
        });
    }

    else {
      console.log('web')

      this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async res => {
        console.log(res)
        
        this.handle_user(res)
      })
        .catch(err => {
          console.log(err)
          this.presentAlert(JSON.stringify(err))
        })
    }


  }

  async handle_user(response ) {

    console.log(response.additionalUserInfo.isNewUser)
    console.log(response.user)
    console.log('new')

    this.response = response.user

    await this.storageService.set('mobile_no', response.user.phoneNumber)
    await this.storageService.set('email', response.user.email)
    await this.storageService.set('name', response.user.displayName)


    if (response.additionalUserInfo.isNewUser) {
      this.show_phone()
    }

    else {
      if (response.user.phoneNumber) {


        console.log('old')

        console.log(response.user.email)
        this.authenticationService.current_user(response.user.email)
          .pipe(untilDestroyed(this))
          .subscribe(async data => {
            
            console.log(data)
            if (isEmpty(data)) {
              console.log('empty')
              let data = {

                email: response.user.email,
                mobile_no: response.user.phoneNumber,
                name: response.user.displayName,
                image_url: response.user.photoURL,
                uid: response.user.uid
              }

              this.addUser(data, response.user)
            }
            else {

              console.log(data)

              console.log('not empty')
              await this.storageService.set('user_id', String(data.id))
              await this.storageService.set('business_name', data.business_name)

              await this.authenticationService.login()

            }

          })

      }

      else {
        this.show_phone()
      }
    }

  }


  send(mobile_no) {


    console.log(mobile_no)

    this.display_phone = false
    this.display_otp = true


    let mobile = '+91' + mobile_no
    console.log(mobile)


    const appVerifier = new firebase.auth.RecaptchaVerifier('send', {
      'size': 'invisible',
    });

    this.response.linkWithPhoneNumber(mobile, appVerifier).then(data => {


      if (data) {

        this.start()
        this.result = data
        console.log(this.result)
      }
    }).catch(err => {
      console.log(err)
      this.presentAlert(JSON.stringify(err))

    })


  }

  verify(otp) {


    console.log(otp)

    this.code = otp.first + otp.second + otp.third + otp.fourth + otp.fifth + otp.sixth
    console.log(this.code)


    this.result.confirm(this.code).then(async result  => {

           
      console.log(result)
      console.log("link success")
      
      var user = result.user;
      console.log(user)

 
      let x = {
        email: user.email,
        mobile_no: user.phoneNumber,
        name: user.displayName,
        image_url: user.photoURL,
        uid: user.uid

      }

      console.log(x)
      await this.addUser(x,user)

    }).catch(function (err) {

      console.log("error")
      console.log(err)
      this.presentAlert(JSON.stringify(err))

    })

  }

addUser(data, user){
  this.userService.addUser(data).pipe(
    untilDestroyed(this)
  ).subscribe(async data => {
    console.log(data)
    if (!isEmpty(data)) {
      await user.reload()
      console.log('user reloaded')
      console.log(data.body.id)
      await this.storageService.set('user_id', String(data.body.id))
      await this.authenticationService.login()
    }
    else {
    this.presentAlert('Something went wrong.')
    }
  })


}


  otpController(event, next, prev, index) {


    if (Number(event.key)) {

      switch (index) {
        case 1: {
          console.log(event.key)
          console.log("first")
          this.otpArray.first = event.key
          break;
        }
        case 2: {
          console.log(event.key)
          console.log("second")
          this.otpArray.second = event.key

          break;
        }
        case 3: {
          console.log(event.key)
          console.log("third")
          this.otpArray.third = event.key

          break;
        }
        case 4: {
          console.log(event.key)
          console.log("fourth")
          this.otpArray.fourth = event.key

          break;
        }

        case 5: {
          console.log(event.key)
          console.log("fifth")
          this.otpArray.fifth = event.key

          break;
        }

        case 6: {
          console.log(event.key)
          console.log("sixth")
          this.otpArray.sixth = event.key

          console.log("submit here")
          console.log(this.otpArray)
          break;
        }

        default: console.log("defaut")
          break;

      }

    }

    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }


  start() {

    SMSReceive.startWatch(
      () => {
        console.log('watch started');
        document.addEventListener('onSMSArrive', (e: any) => {
          console.log('onSMSArrive()');
          var IncomingSMS = e.data;
          console.log('sms.address:' + IncomingSMS.address);
          console.log('sms.body:' + IncomingSMS.body);
          // Debug received SMS content (JSON) 
          console.log(JSON.stringify(IncomingSMS));
          this.processSMS(IncomingSMS);
        });
      },
      () => {
        console.log('watch start failed')


      }
    )


  }

  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped') },
      () => { console.log('watch stop failed') }
    )
  }

  async processSMS(data) {


    const message = data.body;
    if (message) {

      this.otpArray.first = data.body.slice(0, 1);
      this.otpArray.second = data.body.slice(1, 2);
      this.otpArray.third = data.body.slice(2, 3);
      this.otpArray.fourth = data.body.slice(3, 4);
      this.otpArray.fifth = data.body.slice(4, 5);
      this.otpArray.sixth = data.body.slice(5, 6);

      await this.cd.detectChanges()


      console.log("otp")
      console.log(this.otpArray.first);
      console.log(this.otpArray.second);
      console.log(this.otpArray.third);
      console.log(this.otpArray.fourth);
      console.log(this.otpArray.fifth);
      console.log(this.otpArray.sixth);

      this.verify(this.otpArray)

      this.stop();
    }



  }

  enter_mobile() {
    this.display_otp = false
    this.display_phone = true
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      subHeader: 'Please try again',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  ionViewWillLeave() {
    this.subscibe1.unsubscribe()
  }
}


