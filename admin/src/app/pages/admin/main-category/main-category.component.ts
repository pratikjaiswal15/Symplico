import { Component, OnInit } from '@angular/core';
import { MainCategoryService } from '../../../services/main-category.service'
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {

  categories_list;
  date;
  searchTerm : string;

  constructor(public mainCategoryService : MainCategoryService, private router: Router) {
    this.getMain_categoriesAll();

   }

  getMain_categoriesAll() {

    this.mainCategoryService.getMain_categoriesAll().then(data => {
      this.categories_list = data;
    })   
  }

  view(t) {
    let navigationExtras: NavigationExtras = {
      state: {
       cat : t 
      }
  };
  this.router.navigate(['view-one-main-category'], navigationExtras);
  }

update(u, id) {


  let navigationExtras: NavigationExtras = {
    state: {
     cat : u
    }
};
this.router.navigate(['update-one-main-category/:' + id ], navigationExtras);

}

delete(id) {

  this.mainCategoryService.removeMain_categories(id).then(data => {  })
  this.router.navigateByUrl("/all-main-categoris", { skipLocationChange: true }).then(() => {
 
  });

  }


  ngOnInit() {
    this.date = new Date();
  }

 
 

}
