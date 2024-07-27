import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
import { UrlService } from './url.service'

export interface User {
  user_id : number,
  mobile_no : string,
  role : string,
  firebase_uid : string,
  email : string,
  name : string,
  business_name : string,
  gst_number : string,
  fsaai_license : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_id : any;

  hide_tab = new BehaviorSubject(false)

  private id = new BehaviorSubject(null);
  userid_behaviour = this.id.asObservable();


  constructor(private http: HttpClient,private plt: Platform, public storageservice: StorageService, public urlService : UrlService  ) {

    this.plt.ready().then(() => {
      this.userIDbehaviour();
    });

    
   }

   getServiceUser_id(){
     return this.user_id;
   }

   setUser_id(value){
    this.user_id = value
    return this.user_id
   }


   getAllUsers (): Observable<User> {
    return this.http.get<User>(this.urlService.url + 'users')
          
  }

  getOneUser (id): Observable<User> {
    return this.http.get<User>(this.urlService.url + 'users/' + id)
      
  }

  updateUser (id,user): Observable<any> {
    return this.http.put(this.urlService.url + 'users/' + id, user, {observe : 'response'})
  
  }

  patchUser (id,user): Observable<any> {
    return this.http.patch(this.urlService.url + 'users/' + id, user, {observe : 'response'})
  
  }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  addUser (user): Observable<any> {
    return this.http.post<any>(this.urlService.url + 'users', user, {observe : 'response'}  )
  }


  deleteUser (user: User | number): Observable<User> {
  
    return this.http.delete<User>(this.urlService.url + 'users/' + user, {observe : 'response'} ).pipe(
      map(Response => {
        if(Response.status == 204 ) {

        }
  
        else {

        }
      }),
      catchError(<any>('deleteUser'))
    );
  }


findUserId(uid): Observable<any> {
  return this.http.get<User>(this.urlService.url + 'users?filter[fields][id]=true&filter[where][firebase_uid]=' +uid )

}

findUserRole(uid) : Observable<any> {
  return this.http.get<User[]>(this.urlService.url + 'users?filter[fields][role]=true&filter[where][firebase_uid]=' +uid )

}

get_mobileAndMail(id): Observable<any>{
  return this.http.get<User[]>(this.urlService.url + 'users/' + id + '?filter[fields][mobile_no]=true&filter[fields][email]=true' )

}

getRoleDetails(id,role): Observable<any> {
  return this.http.get<User[]>(this.urlService.url + 'users/' + id + '?filter[include][0][relation]=' +role )

}

userIDbehaviour(){
  this.storageservice.get('user_id').then(res => {
    if (res) {
      console.log('serivce id')
      console.log(Number(res))
      this.id.next(Number(res));
    }
  })
}


  
}
