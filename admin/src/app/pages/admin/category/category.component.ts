import { Component, OnInit } from '@angular/core';
import { MainCategoryService } from '../../../services/main-category.service'
import { Router, NavigationExtras } from '@angular/router';
import { CategoryService } from '../../../services/category.service'



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {



  categories_list;
  date;
  searchTerm; 
  subscribe1: any;
  constructor(public mainCategoryService : MainCategoryService,public categoryService : CategoryService, private router: Router) {
    this.get_categoriesAll();
   }

  
   get_categoriesAll() {
   this.categoryService.get_categoriesAll().then(data => {
      console.log(data)
      this.categories_list = data;
    }) 
   }


   view(t) {
    let navigationExtras: NavigationExtras = {
      state: {
       cat : t 
      }
  };
  this.router.navigate(['view-one-category'], navigationExtras);
  }

  
update(u, id) {

  let navigationExtras: NavigationExtras = {
    state: {
     cat : u
    }
};
this.router.navigate(['update-one-category/:' + id ], navigationExtras);

}

delete(id) {

  this.categoryService.remove_categories(id).then(data => {  })
  this.router.navigateByUrl("/all-categories", { skipLocationChange: true }).then(() => {

  });

  }
  ngOnInit() {
    this.date = new Date();

  }

}
