import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { FormBuilder ,Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {

  data: any;
  myid = null;
  date;
  subscibe1: any;

  get name() {
    return this.updateMform.get('name')
   }

   set name(n) {
    this.updateMform.controls['name'].setValue(n)
   }

   get description() {
     return this.updateMform.get('description')
   }

   set description(n) {
    this.updateMform.controls['description'].setValue(n)
   }

  constructor(private route: ActivatedRoute, private router: Router, public categoryService :CategoryService ,private fb:FormBuilder) {
     
  this.subscibe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        this.myid = this.data.category_id
        this.name = this.data.name
        this.description = this.data.description
        
        console.log(this.data)
      }
    });
    

   }
 
   updateMform = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)] ],
    description : ['']
  })

  update(){
    let main_category = {
      name : this.name.value,
      description : this.description.value,
      date : new Date().toISOString(),

    } 
  
      this.categoryService.update_categories(this.myid,main_category).then(data => {
       // console.log(data);
    } )
    
  
  }
  ngOnInit() {

  }

  async ngOnDestroy() {
    await this.subscibe1.unsubscribe()
  }

}
