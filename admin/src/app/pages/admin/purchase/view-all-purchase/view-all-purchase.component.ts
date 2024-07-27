import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseService } from '../../../../services/purchase.service';
import { ProductService } from '../../../../services/product.service';
import { VendorService } from '../../../../services/vendor.service';

import { FormControl } from '@angular/forms'

import { Subscription, of, Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { debounceTime, switchMap, filter } from 'rxjs/operators';




@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-view-all-purchase',
  templateUrl: './view-all-purchase.component.html',
  styleUrls: ['./view-all-purchase.component.scss']
})
export class ViewAllPurchaseComponent implements OnInit, OnDestroy  {

  
  vendor_id;
  searchVendorCtrl =  new FormControl()
  subscibe1: Subscription;
  vendor_list: Observable<any>;
  subscibe3: Subscription;
  purchase = [];
  show: boolean ;
  dont_show: boolean;


  limit = 5;
  skip = 0;

  subscribe4: Subscription;
  Total_pages : number;
  page = 0;



   constructor(public purchaseService : PurchaseService,  public productService : ProductService, public vendorService : VendorService )  { 

    
  }
  
 
  
  
  ngOnInit() {


 this.vendor_list =  this.searchVendorCtrl.valueChanges.pipe(
      debounceTime(400),
      filter(term => term), // or even better with `filter(Boolean)`

      switchMap((value) =>{
        if(value != '') {
          return this.search_seller(value)
        }
        else {
          return of(null);
        }
      } )      
    )
 
  }
 

  get5Seller(){

  return this.vendorService.five_vendors()
  }
  

  search_seller(value) {
    if(value) {
      return this.vendorService.search_vendors(value)
    }
  }

  displayFn(product): string {
    return product? product.name: product;
  }

  Selected(data){
    console.log(data)
    console.log(data.vendor_id)

    this.vendor_id = data.vendor_id
    this.PurchaseCount(data.vendor_id)
    this.getAllPurchase(data.vendor_id, this.limit , this.skip)
  }

  PurchaseCount(id){
    this.subscribe4 = this.purchaseService.GetPurchaseCount(id).subscribe(data =>{
      if(data){


        console.log(data.count)
        this.Total_pages = Math.round(data.count / this.limit)
        console.log(this.Total_pages)
      }
    }) 
  }

  getAllPurchase(id, limit, skip) {

    console.log(`Seller - ${id}, limit - ${limit}, skip -${skip}`)

    this.subscibe3 =this.purchaseService.getPurchaseSeller(id , limit, skip).subscribe(data => {
      if(data){
       this.purchase = this.purchase.concat(data)
       console.log(this.purchase)
       this.show = true

       console.log(this.show)
      }

      else {
        this.dont_show = true
        this.show = false
        console.log(this.dont_show)
      }
    }) 
 }  

 onScroll(){


  this.page ++;

  if(this.page === this.Total_pages) {
    console.log("finished")
    return;
  }

  console.log("scrolled")
  console.log(`page -  ${this.page}, total pages -  ${this.Total_pages}`)
  this.skip = this.skip + 3;
  console.log("selelr " +this.vendor_id)
  this.getAllPurchase(this.vendor_id,this.limit, this.skip)

  

 }

 ngOnDestroy() {
}

  
 /*
 nextBatch(val){

   console.log("val " + val)
   console.log("hi")
   const end = this.viewPort.getRenderedRange().end;
   const total = this.viewPort.getDataLength();
   console.log(`${end}, '>=', ${total}`);  
   // 


   if (end === total) {
    console.log(this.skip = this.skip + 5)
    this.getAllPurchase(3,2,2)
  }
 }

  /*
  total(serial_no: any, purchase_id: any, quantity: any,buyingprice: any,date: any,product_name: any, vendor_name: any) {


  let purchase =  new PurchaseClass (serial_no, purchase_id,quantity,buyingprice,date,product_name, vendor_name)
  
  this.common_purchase.push(purchase)
  this.final_array = JSON.parse(JSON.stringify(this.common_purchase))
  this.dataSource = new MatTableDataSource<Purchase>(this.final_array)

  this._alldata = this.final_array;
  this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
  //this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
  //this.dataSource.filter = performance.now().toString();

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort
  

  this.totalquant = this.final_array.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
  this.totalPrice = this.final_array.map(t => t.buyingprice).reduce((acc, value) => acc + value, 0);
 

  }

  


  update(u,id) {

    let navigationExtras: NavigationExtras = {
      state: {
       cat : u
      }  
    } 
    this.router.navigate(['update-purchase/:' + id ], navigationExtras);

   }

   groupBy(event, column) {
    event.stopPropagation();
    this.checkGroupByColumn(column.field, true);
    this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  checkGroupByColumn(field, add ) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === field) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if ( add ) {
        this.groupByColumns.push(field);
      }
    }
  }

  unGroupBy(event, column) {
    event.stopPropagation();
    this.checkGroupByColumn(column.field, false);
    this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  // below is for grid row grouping
  customFilterPredicate(data: any | Group, filter: string): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof Group)) {
          return false;
        }
        let match = true;
        this.groupByColumns.forEach(column => {
          if (!row[column] || !data[column] || row[column] !== data[column]) {
            match = false;
          }
        });
        return match;
      }
    );

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString();  // bug here need to fix
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subGroups = [];
    groups.forEach(group => {
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    return item.level;
  }
 
*/  
  

}
