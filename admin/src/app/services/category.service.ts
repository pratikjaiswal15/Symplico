import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  main_url : string = '';
  status : number;

  constructor(private http: HttpClient, private router : Router,private toastr: ToastrService) { 
    this.main_url = "http://[::1]:3000/"

  }


  get_categoriesAll(){

    return new Promise(resolve => {
      this.http.get(this.main_url + 'categories').subscribe(data => {
        resolve(data);
      }, err => {
        this.toastr.error(err)
      })
      
    } );

   }


   get_categoryOne(id){

    return new Promise(resolve => {
      this.http.get(this.main_url + 'categories' ).subscribe(data => {
        resolve(data);
      }, err => {
        this.toastr.error(err)
      })
    } );
     
   
  }

/** 

   addMain_categories(cat) {

    return new Promise(resolve => {
      this.http.post(this.main_url + 'main-categories', cat, {observe: 'response'}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err)
      })

    } );
   }
**/

add_categories(cat) {

  return new Promise(resolve => {
    this.http.post(this.main_url + 'categories', cat, {observe: 'response'})
    .subscribe(resp => {
      console.log(resp);
      if(resp.status == 200 || resp.status == 201 || resp.status == 204) {
        this.toastr.success("data successfully added to database")
      }
      else {
        this.toastr.error('soething went wrong! please try agian later')
      }
   }, err => {
     this.toastr.error(err)
   }
   );

  } );
 }


   update_categories(id,cat) {

    return new Promise(resolve => {
      this.http.put(this.main_url + 'categories/' + id , cat, {observe: 'response'} )
      .subscribe(resp => {
          console.log(resp.status)    
          if(resp.status == 204 || resp.status == 200 ){
            this.toastr.success('data updated successfully');
          }
          else {
            this.toastr.error('soething went wrong! please try agian later')
          }
             
      }, err => {
        this.toastr.error(err)
      })
    } );
   }
 


   remove_categories(id, ){

    return new Promise(resolve => {
      this.http.delete(this.main_url + 'categories/' + id,{observe: 'response'})
      .subscribe(resp => {
        console.log(resp);
        if(resp.status == 204) {
          this.toastr.success("data deleted sucessfully")
        }
        else {
          this.toastr.error('soething went wrong! please try agian later')
        }
        
      }, err => {
        this.toastr.error(err)
      })
    } );

    
   }

   getCategoryNames(): Observable<any> {
    return this.http.get<any>('http://[::1]:3000/categories?filter[fields][name]=true')
  
    }




  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      this.toastr.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.toastr.error(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
