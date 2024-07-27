import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'

import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@UntilDestroy()


@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.page.html',
  styleUrls: ['./user-type.page.scss'],
})
export class UserTypePage implements OnInit {


 
  user_id :any


  subscribe1: Subscription

  get Business_name() {
    return this.Form.get('Business_name')
   }
   
  get GST_no() {
    return this.Form.get('GST_no')
   }
   
  get FSAAI_license() {
    return this.Form.get('FSAAI_license')
   }
   

  constructor( private fb:FormBuilder,public userService :UserService, private route : ActivatedRoute,
    public authenticationService : AuthenticationService, private router: Router, public storageService : StorageService) {
    
        this.subscribe1 =  this.userService.userid_behaviour.subscribe(val =>{
            if(val != null){
              this.user_id = val
            }
          })    
   }

    Form = this.fb.group({
      Business_name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*') ] ],
      GST_no : ['',[ Validators.minLength(15), Validators.maxLength(15), Validators.pattern('[0-9]+')]],
      FSAAI_license : ['',[ Validators.minLength(14), Validators.maxLength(14), Validators.pattern('[0-9]+')]],

    })



  ngOnInit() {

  }


  submit(form){
   
    
    console.log(form)
    let user = {
      business_name : form.Business_name,
      gst_number : form.GST_no,
      fsaai_license : form.FSAAI_license
    
    }

    console.log(user)

    this.userService.patchUser(this.user_id,user).pipe(
      untilDestroyed(this)
    ).subscribe(async data =>{

      if(data) {
        console.log(data)
        await this.storageService.set('business_name', form.Business_name)
        this.authenticationService.authenticationState.next(true)
      } 
    })


    
  }

  ionViewWillLeave(){
    this.subscribe1.unsubscribe()
  
  }
}
