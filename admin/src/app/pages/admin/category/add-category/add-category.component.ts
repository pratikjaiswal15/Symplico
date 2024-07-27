import { Component, OnInit } from '@angular/core';
import { MainCategoryService } from '../../../../services/main-category.service';
import { CategoryService } from '../../../../services/category.service'
import { FormBuilder ,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


  categories_list;
  date;
  id : number;
  clicked = false;
  check : boolean = true ;
  category_names: any;
  public filteredList1;


  
  get name() {
    return this.addCform.get('name')
   }
   
   get description() {
     return this.addCform.get('description')
   }

   get selected() {
    return this.addCform.get('selected')
   }


  
   
   
  constructor(private toastr: ToastrService,public mainCategoryService : MainCategoryService, public categoryService : CategoryService ,private fb:FormBuilder) { 
    this.getMain_categoriesAll();
  

  }


  addCform = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)] ],
    description : [''],
    selected : ['', Validators.required],
  })


  getMain_categoriesAll() {

    this.mainCategoryService.getMain_categoriesAll().then(data => {

      this.categories_list = data;
      this.filteredList1 = this.categories_list.slice();

    })   
  }


  ngOnInit() {

    this.date = new Date().toISOString();
    

  }

  add() {

   let main_category = {
    name : this.name.value,
    description : this.description.value,
    date : new Date().toISOString(),
    main_id : Number (this.selected.value),

  }
      this.categoryService.add_categories(main_category).then(data => {
      })

  }


}
