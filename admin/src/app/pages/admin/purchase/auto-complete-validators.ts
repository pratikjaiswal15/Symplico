import {  AbstractControl } from '@angular/forms';


    export function RequireMatch(control: AbstractControl) {
        const selection: any = control.value;
        if (typeof selection === 'string') {
            return { incorrect: true };
        }
        return null;
    /*
    static mustBeInList = (list: Array<any>, key: string) => {
    return (control: FormControl) => {
      let isInside: boolean;
      const valueToCompare: string | boolean =
        typeof control['value'] === 'object'
          ? control['value'][key].toLowerCase()
          : typeof control['value'] === 'string'
          ? control['value']
          : false;

      isInside = list.some(entry => {
        const currentValue: string = entry[key].toLowerCase();
        return currentValue === valueToCompare;
      });
      if (isInside) {
        return null;
      } else {
        return { mustBeInList: { valid: false } };
      }
    };
  }
*/  
}


