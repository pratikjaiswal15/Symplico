import { Component, OnInit, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { FormBuilder ,Validators } from '@angular/forms';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { AddressService } from '../../services/address.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Plugins } from '@capacitor/core';
import { AlertController, IonInput } from '@ionic/angular';

const { Geolocation } = Plugins;

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';

@UntilDestroy()

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  locationCoords: any;
  timetest: any;
  geoAddress;

  watchLocationUpdates:any; 
  loading:any;
  isWatching:boolean;

  address;
  concat;
  final :any;
  addresss;
  data: any;
  firebase_uid;
  id;
  edit_Address: any;
  subscibe1: Subscription;
  subscibe2: Subscription;
  subscibe3: Subscription;

  @ViewChild('road')  inputElement: IonInput;
  constructor(private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy,
    private nativeGeocoder: NativeGeocoder, private fb:FormBuilder, public addressService : AddressService, private route: ActivatedRoute,
    private router: Router,  public userService :UserService, public alertCtrl : AlertController) {

      this.locationCoords = {
        latitude: "",
        longitude: "",
        accuracy: "",
        timestamp: ""
      }
  
      this.timetest = Date.now();


    this.subscibe1 =  this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
           this.data = this.router.getCurrentNavigation().extras.state.user_id;

           if(this.router.getCurrentNavigation().extras.state.edit_address) {
              this.edit_Address = this.router.getCurrentNavigation().extras.state.edit_address

              console.log("on edit page")
              console.log(this.edit_Address)
              console.log(this.edit_Address.landmark)
              console.log(this.edit_Address.alternate)

              this.pincode = this.edit_Address.pincode
              this.address_line1 = this.edit_Address.address_line1
              this.address_line2 = this.edit_Address.address_line2
              this.city = this.edit_Address.city
              this.state = this.edit_Address.state

              if(this.edit_Address.landmark) {
                this.Landmark = this.edit_Address.landmark
                console.log(this.Landmark.value)
              }

              if(this.edit_Address.alternate_mobile_no) {
                this.alternate = this.edit_Address.alternate_mobile_no
                console.log(this.alternate.value)

              }


           }
        }
        else {
        this.subscibe2 =   this.userService.userid_behaviour.subscribe(val =>{
           if(val) {
            this.data = val
            console.log(this.data)
           } 
          })
        }
      });

     }

     get pincode() {
      return this.addressForm.get('pincode')
     }
  
     set pincode(u) {
      this.addressForm.controls['pincode'].setValue(u)
    }  
  
    get address_line1() {
      return this.addressForm.get('address_line1')
     }
  
     set address_line1(u) {
      this.addressForm.controls['address_line1'].setValue(u)
    }
  
    get address_line2() {
      return this.addressForm.get('address_line2')
     }
  
     set address_line2(u) {
      this.addressForm.controls['address_line2'].setValue(u)
    }
  
    get Landmark() {
      return this.addressForm.get('Landmark')
     }
  
     set Landmark(u) {
      this.addressForm.controls['Landmark'].setValue(u)
    } 
   
  
    get city() {
      return this.addressForm.get('city')
     }
  
  
     set city(u) {
      this.addressForm.controls['city'].setValue(u)
    } 
    
    get state() {
      return this.addressForm.get('state')
     }
  
     set state(u) {
      this.addressForm.controls['state'].setValue(u)
    } 
    
    get alternate() {
      return this.addressForm.get('alternate')
     }
  
     set alternate(u) {
      this.addressForm.controls['alternate'].setValue(u)
    } 
  
    addressForm = this.fb.group({
      pincode : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]  ],
      address_line1 : ['', [Validators.required, Validators.minLength(5)]],
      address_line2 : ['', [Validators.required, Validators.minLength(5)]],
      Landmark : ['', Validators.minLength(3)],
      city : ['', [Validators.required, Validators.minLength(3)]],
      state : ['', [Validators.required, Validators.minLength(3)]],
      alternate : ['', [Validators.minLength(10), Validators.maxLength(10)]]
  
     
    })
  
  
     ngOnInit() {
    }

    ionViewWillEnter(){

    }
  
    
   //Check if application having GPS access permission  
  checkGPSPermission() {

    console.log("check working")
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        this.presentFailedAlert(err)
      }
    );
  }
 
  requestGPSPermission() {

    console.log("request working")
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              this.presentFailedAlert('Error requesting location permissions ' + JSON.stringify(error) )
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {

    console.log("Ask working")
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => this.presentFailedAlert('Error requesting location permissions '+ JSON.stringify(error))
      )
  }
 
  // Methos to get device accurate coordinates using device GPS
  async getLocationCoordinates() {

    Geolocation.getCurrentPosition().then(val => {
      console.log(val.coords.latitude)
      console.log(val.coords.longitude)
      this.getGeoencoder(val.coords.latitude,val.coords.longitude)


    }).catch(err => this.presentFailedAlert('Error getting location'))
    
  }

  getGeoencoder(latitude,longitude){

    console.log("geocoder working")
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  
    this.nativeGeocoder.reverseGeocode(latitude, longitude, options )
    .then(async (result: NativeGeocoderResult[]) => {
      this.geoAddress = (result[0]);
    
  
      this.concat = [this.geoAddress.areasOfInterest, this.geoAddress.subThoroughfare, this.geoAddress.thoroughfare, this.geoAddress.subLocality,
      this.geoAddress.locality ].filter(Boolean).join(", ");
  
      this.address_line1 = this.concat;
      this.city =  this.geoAddress.subAdministrativeArea
  
      this.state = this.geoAddress.administrativeArea
  
      this.pincode = this.geoAddress.postalCode
  
      console.log(this.concat)
  
      this.address = await this.generateAddress(result[0]);

      this.inputElement.setFocus()

  
    })
    .catch((error: any) => {
      this.presentFailedAlert('Error getting location'+ JSON.stringify(error))
    });
  }
  
     //Return Comma saperated address
     generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }
  
  
    submit(value){

      console.log(value) 

      if(this.edit_Address) {

      let y = value
      let check = {
        pincode : y.pincode,
        address_line1 : y.address_line1,
        address_line2 : y.address_line2,
        landmark : y.Landmark,
        city : y.city,
        state : y.state,
        alternate_mobile_no : y.alternate,
        user_id : this.edit_Address.user_id

      }
      
        this.addressService.patchAddress(this.edit_Address.user_id, this.edit_Address.address_id, check).pipe(
          untilDestroyed(this)
        ).subscribe(data=>{
          console.log(data)

          if(data) {
    
          let navigationExtras: NavigationExtras = {
            state: {
              added_address : check,
              address_id : this.edit_Address.address_id
            }
          };
  
          this.router.navigate(['tabs/tab5'], navigationExtras)  

          }

      
        })
        
      }

      else {

      let x= value;
      if(this.data) {
  
      let address = {
        pincode : value.pincode,
        address_line1 : value.address_line1,
        address_line2 : value.address_line2,
        landmark : value.Landmark,
        city : value.city,
        state : value.state,
        alternate_mobile_no : value.alternate,
        user_id : (this.data)
  
      }
       console.log(address)
  
  
       this.addressService.addAddress(address).pipe(
         untilDestroyed(this)
       ).subscribe(val =>{
         console.log(val)
  
         let navigationExtras: NavigationExtras = {
          state: {
            added_address : val.body
          }
        };

        this.router.navigate(['tabs/tab5'], navigationExtras)
    
  
       })
  
  
    }
  
    else {
    this.subscibe3 =  this.userService.userid_behaviour.subscribe(val =>{
        if(val) {
          this.data = val
          console.log("behave" + this.data)
          this.submit(x)
        }
      })
    }
      }
      
  }

  async presentFailedAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Oops',
      message: msg || 'Error getting location.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewWillLeave(){
    this.subscibe1.unsubscribe()
    console.log(this.subscibe1.closed)

    if(this.subscibe2 instanceof Subscription){
      this.subscibe2.unsubscribe()
      console.log(this.subscibe2.closed)
    }

    
    if(this.subscibe3 instanceof Subscription){
      this.subscibe3.unsubscribe()
      console.log(this.subscibe3.closed)
    }
  }
}
