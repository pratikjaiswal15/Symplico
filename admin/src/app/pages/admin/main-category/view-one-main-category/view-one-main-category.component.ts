import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainCategoryService } from '../../../../services/main-category.service'



@Component({
  selector: 'app-view-one-main-category',
  templateUrl: './view-one-main-category.component.html',
  styleUrls: ['./view-one-main-category.component.scss']
})
export class ViewOneMainCategoryComponent implements OnInit, OnDestroy {
 
  data: any;
 myid = null;
  category;
  editable;
  subscibe1: any;

  constructor(private route: ActivatedRoute, private router: Router, public mainCategoryService : MainCategoryService) {
  
this.subscibe1 = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.cat;
        this.myid = this.data.main_id
        
      }
    });
  }

  ngOnInit() {
    this.getMain_categoryOne(this.myid);

  }

  getMain_categoryOne(id){

    this.mainCategoryService.getMain_categoryOne(id).then(data => {
      this.category = data;

    })

  }

  ngOnDestroy() {
  }

}