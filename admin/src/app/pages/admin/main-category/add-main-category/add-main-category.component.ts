import { Component, OnInit } from '@angular/core';
import { MainCategoryService } from '../../../../services/main-category.service'
import { FormBuilder ,Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-main-category',
  templateUrl: './add-main-category.component.html',
  styleUrls: ['./add-main-category.component.scss']
})
export class AddMainCategoryComponent implements OnInit {


  clicked = false;

 get name() {
 return this.addMCform.get('name')
}

get description() {
  return this.addMCform.get('description')
}

date;
  constructor(public mainCategoryService : MainCategoryService,private fb:FormBuilder,private router: Router ) { }

  addMCform = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)] ],
    description : ['']
  })

  ngOnInit() {
    this.date = new Date();

  }
  
  addMain_categories() {

    let main_category = {
      name : this.name.value,
      description : this.description.value,
      date : new Date(),
    

    }   
        this.mainCategoryService.addMain_categories(main_category).then(data => {
         
            if(data){
              this.router.navigate(['all-main-categoris']);
            }
        })  
  }

}
