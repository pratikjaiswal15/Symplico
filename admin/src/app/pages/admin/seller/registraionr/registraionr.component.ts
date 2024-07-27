import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registraionr',
  templateUrl: './registraionr.component.html',
  styleUrls: ['./registraionr.component.scss']
})
export class RegistraionrComponent implements OnInit {

  clicked : boolean;

  constructor(private fb:FormBuilder) {
    this.clicked = false
  }

  get name() {
    return this.addCform.get('name')
  }
  
  get mobile_no() {
    return this.addCform.get('mobile_no')
  }


  get email() {
    return this.addCform.get('email')
  }

  get address_line1() {
    return this.addCform.get('address_line1')
  }

  get state() {
    return this.addCform.get('state')
  }

  get city() {
    return this.addCform.get('city')
  }

  get pincode() {
    return this.addCform.get('pincode')
  }

  get gst_number() {
    return this.addCform.get('gst_number')
  }

  addCform = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)] ],
    mobile_no : ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
    email : ['', Validators.email],
    address_line1 : ['' , [ Validators.required, Validators.minLength(3)]],
    city : ['' , [ Validators.minLength(3)]],
    state : ['' , [ Validators.minLength(3)]],
    pincode : ['' , [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]],
    gst_number : ['' , [ Validators.pattern("^[0-9]*$"),Validators.minLength(15), Validators.maxLength(15)]]
  })


  ngOnInit(): void {
  }

  add(value) {
    console.log(value)

  }

}
