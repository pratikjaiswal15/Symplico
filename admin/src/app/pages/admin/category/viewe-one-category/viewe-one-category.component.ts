import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service'


@Component({
  selector: 'app-viewe-one-category',
  templateUrl: './viewe-one-category.component.html',
  styleUrls: ['./viewe-one-category.component.scss']
})
export class VieweOneCategoryComponent implements OnInit, OnDestroy {

  data: any;
  myid = null;
   category;
   editable ;
  subscibe1: any;
   
  constructor(private route: ActivatedRoute, private router: Router, public categoryService : CategoryService) { 

this.subscibe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        this.myid = this.data.category_id
        
        console.log(this.data)
      }
    });
  }


  get_categoryOne(id){

    this.categoryService.get_categoryOne(id).then(data => {
      console.log(data)
      this.category = data;

    })

  }
  ngOnInit() {
    this.get_categoryOne(this.myid);

  }

 ngOnDestroy() {
     this.subscibe1.unsubscribe()
  }

}
