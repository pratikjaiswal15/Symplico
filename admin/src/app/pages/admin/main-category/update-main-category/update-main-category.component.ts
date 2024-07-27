import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainCategoryService } from 'src/app/services/main-category.service';
import { FormBuilder ,Validators } from '@angular/forms';



@Component({
  selector: 'app-update-main-category',
  templateUrl: './update-main-category.component.html',
  styleUrls: ['./update-main-category.component.scss']
})
export class UpdateMainCategoryComponent implements OnInit , OnDestroy {

  data: any;
  myid = null;
  date;
  subscibe1: any;

  
 

  get name() {
    return this.updateMCform.get('name')
   }

   set name(n) {
    this.updateMCform.controls['name'].setValue(n)
   }

   get description() {
     return this.updateMCform.get('description')
   }

   set description(n) {
    this.updateMCform.controls['description'].setValue(n)
   }
  constructor(private route: ActivatedRoute, private router: Router, public mainCategoryService : MainCategoryService,private fb:FormBuilder) { 


    
   this.subscibe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        this.myid = this.data.main_id
        this.name = this.data.name
        this.description = this.data.description
        
      }
    });
 


  }

    updateMCform = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(3)] ],
      description : ['']
    })

  ngOnInit() {
    this.date = new Date();
  }

  
update(){
  let main_category = {
    name : this.name.value,
    description : this.description.value,
    date : new Date().toISOString(),
  } 
  
    this.mainCategoryService.updateMain_categories(this.myid,main_category).then(data => {
  } )
  }

   ngOnDestroy() {

    this.subscibe1.unsubscribe()
  
  }
 

}
