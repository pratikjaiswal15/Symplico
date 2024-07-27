import { Injectable } from '@angular/core';

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})


export class StorageService {
  constructor() { }

  async set(key: string, value: any): Promise<any> {


    if (value == null || value == undefined) {
      //      console.log("dont'do")
    }
    else {

      try {

        await Storage.set({
          key: key,
          value: value
        });
        console.log('set string in storage: ', value);
        return true;
      } catch (reason) {
        console.log(reason);
        return false;
      }
    }

  }
  // to get a key/value pair
  async get(key: string): Promise<any> {
    try {

      const result = await Storage.get({ key: key });
      //console.log('storageGET: ' + key + ': ' + result.value);
      if (result != null) {
        return result.value;
      }
      else {
        console.log("null from service")
        return null;
      }

    } catch (reason) {
      console.log(reason);
      return null;
    }
  }




  async remove(key: string) {

    await Storage.remove({
      key: key
    });
  }

  async clear() {
    await Storage.clear();
  }

  /* 
   async set(key: string, value: any): Promise<any> {
   

      if(value == null || value == undefined) {
        console.log("dont'do")
      }
      else {

        try { 
          const result = await this.storage.set(key, value);
          console.log('set string in storage: ' + result);
          return true;
        } catch (reason) {
            console.log(reason);
            return false;
        }
      }
    
    }
    // to get a key/value pair
    async get(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      console.log('storageGET: ' + key + ': ' + result);
      if (result != null) {
      return result;
      }
      return null;
    } catch (reason) {
    console.log(reason);
    return null;
    }
    }


    async clear(){
       this.storage.clear();
    }

   async remove(key: string) {
      this.storage.remove(key);
      
    }

    async ready() : Promise<any>{
      try {
        this.storage.ready();
        return true; 
      }
      catch(err) {
        console.log(err)
      }
    }
*/
}

