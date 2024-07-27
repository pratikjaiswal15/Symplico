import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component'

@Component({
  selector: 'app-verify-seller',
  templateUrl: './verify-seller.component.html',
  styleUrls: ['./verify-seller.component.scss']
})
export class VerifySellerComponent implements OnInit {

  durationInSeconds = 5;

  name : string;
  mobile_no : string;
  email : string;
  address : string;
  city : string;
  state : string;
  pincode : string;
  show: boolean;
  seller_id: any;

  constructor(public dialogRef: MatDialogRef<VerifySellerComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data) {

      if(data && data.length){

        this.show = true
  
       console.log("yes")

       for(let i=0 ; i<data.length; i++) {

        this.seller_id = data[i].vendor_id
         this.name = data[i].name
         this.mobile_no = data[i].mobile_no
         this.email = data[i].email
         this.address = data[i].address_line1 + ',' +  data[i].city + ','  + data[i].state + '-' + data[i].pincode
       }

      }
      else {
        console.log("no")
        this.show = false    
      }

      
     }

  ngOnInit(): void {

  }

  
  onNoClick(): void {
    this.dialogRef.close();

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,

    })
  }

  yes(){
    console.log("youdone")
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data : this.name
    });
  }

}
