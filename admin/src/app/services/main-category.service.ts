import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class MainCategoryService {

  main_url : string = '';


  constructor(private http: HttpClient, private toastr: ToastrService) {

    this.main_url = "http://[::1]:3000/"
   }

   getMain_categoriesAll(){

    return new Promise(resolve => {
      this.http.get(this.main_url + 'main-categories').subscribe(data => {
        resolve(data);
      }, err => {
        this.toastr.error(err)
      })
      
    } );

   }

   getMain_categoryOne(id){

    return new Promise(resolve => {
      this.http.get(this.main_url + 'main-categories' ).subscribe(data => {
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

   addMain_categories(cat) {

    return new Promise(resolve => {
      this.http.post(this.main_url + 'main-categories', cat, {observe: 'response'})
      .subscribe(resp => {
        if(resp.status == 200 || resp.status == 201 || resp.status == 204) {
          this.toastr.success('main category successfully added!');
        }
        else {
          this.toastr.error('something went wrong ')
        }
     }, err => {
      this.toastr.error(err)
     }
     );

    } );
   }


   updateMain_categories(id,cat) {

    return new Promise(resolve => {
      this.http.put(this.main_url + 'main-categories/' + id , cat, {observe: 'response'} )
      .subscribe(resp => {
          if(resp.status == 204 || resp.status == 200) {
            this.toastr.success('data updataed successfully!');
          }

          else {
            this.toastr.error('something went wrong ')
          }

      }, err => {
        this.toastr.error(err)
      })
    } );
   }
 


   removeMain_categories(id){

    return new Promise(resolve => {
      this.http.delete(this.main_url + 'main-categories/' + id,{observe: 'response'})
      .subscribe(resp => {
        if(resp.status == 204) {
          this.toastr.success("data deleted sucessfully")
        }
        else {
          this.toastr.error('something went wrong ')
        }
        
      }, err => {
        this.toastr.error(err)
      })
    } );

    
   }


   getMainCategoryNames(): Observable<any> {
    return this.http.get<any>('http://[::1]:3000/main-categories?filter[fields][name]=true')
    .pipe(
      catchError(this.handleError<any>('getMainCategoryNames', []))
      )
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
