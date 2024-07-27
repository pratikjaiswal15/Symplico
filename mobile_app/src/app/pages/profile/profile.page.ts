import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/services/authentication.service';

@UntilDestroy()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  user_id: any;
  user_data: any;
  name : string;
  mobile_number : string;

  email : string;
  role : string;
  image_url : any;
  isReadOnly : boolean = false;

  subscribe1: Subscription;
  subscribe2: Subscription


  constructor(private router: Router, private route : ActivatedRoute,  public afauth: AngularFireAuth, public userService :UserService,public storageService : StorageService,
    private fb : FormBuilder, private authenticationService : AuthenticationService) {

      this.subscribe1 =  this.route.queryParams.subscribe(() =>{
        if(this.router.getCurrentNavigation().extras.state){
          console.log(this.router.getCurrentNavigation().extras.state.user_id)
          this.user_id = this.router.getCurrentNavigation().extras.state.user_id
          console.log(this.user_id)
        }
      })
  
    
     }

     get Business_name() {
      return this.BusinesForm.get('Business_name')
     }
     
     set Business_name(u) {
      this.BusinesForm.controls['Business_name'].setValue(u)
    }
  
  
    get GST_no() {
      return this.BusinesForm.get('GST_no')
     }
     
     set GST_no(u) {
      this.BusinesForm.controls['GST_no'].setValue(u)
    }

    get FSAAI_license() {
      return this.BusinesForm.get('FSAAI_license')
     }
     
     set FSAAI_license(u) {
      this.BusinesForm.controls['FSAAI_license'].setValue(u)
    }
    
  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getData()

  }

  getData(){
    if(this.user_id){

    this.userService.getOneUser(this.user_id).pipe(
      untilDestroyed(this)
    ).subscribe(data =>{
        console.log(data)
        this.user_data = data
        console.log(this.user_data.name)
        this.name = this.user_data.name
        this.email = this.user_data.email
        this.Business_name = this.user_data.business_name
        this.FSAAI_license = this.user_data.fsaai_license
        this.GST_no = this.user_data.gst_number
        this.role = this.user_data.role
        this.mobile_number = this.user_data.mobile_no
        this.image_url = this.user_data.image_url
          
      })
    }
    else {
    this.subscribe2 =this.userService.userid_behaviour.pipe(untilDestroyed(this))
      .subscribe(data => {
        if(data != null){
          this.user_id = data

          this.getData()
        }
      })
    }

  }

  goBack() {
   // this.router.navigate(['menu/items'])
  }

  BusinesForm = this.fb.group({
    Business_name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*') ] ],
    GST_no : ['',[ Validators.minLength(15), Validators.maxLength(15), Validators.pattern('[0-9]+')]],
    FSAAI_license : ['',[ Validators.minLength(14), Validators.maxLength(14), Validators.pattern('[0-9]+')]],
   
  })

  edit(business){

    business.setFocus()
    this.isReadOnly = true
  }

  submit(value){

    console.log(value.GST_no)
    console.log(value.FSAAI_license)

   switch (true) {
 
     case !value.GST_no : {
       console.log("no gst")

       let details = {
        business_name : value.Business_name,
        fsaai_license : value.FSAAI_license
      }
      console.log(details)
      this.pathUser(details)

       break;
     } 

     case !value.FSAAI_license : {
       console.log(" no fssai")
       let details = {
        business_name : value.Business_name,
        gst_number : value.GST_no,
    }

      console.log(details)
      this.pathUser(details)
       break;
     }

     default : {
       console.log("all available")

       let details = {
        business_name : value.Business_name,
        gst_number : value.GST_no,
        fsaai_license : value.FSAAI_license
    }
      console.log(details)
      this.pathUser(details)

       break;
     }
   } 
    
  }

  pathUser(object){
   this.userService.patchUser(this.user_id, object).pipe(untilDestroyed(this))
   .subscribe(data =>{
      console.log(data)
    })

  }

  logout(){
    this.authenticationService.logout()
  }
/*
  ionViewDidEnter() {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      10000,
      () => 
      {if(this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop()
      }
    }
    );
  }
  
  ionViewWillLeave() {
    this.backButtonSub.unsubscribe();
  }
*/
 
ionViewWillLeave(){
 
  this.subscribe1.unsubscribe()
  if(this.subscribe2 instanceof Subscription){
    console.log(this.subscribe2.closed)

    this.subscribe2.unsubscribe()

  }


}  
}
