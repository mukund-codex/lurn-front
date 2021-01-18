import { AbstractControl } from '@angular/forms';
import * as moment from 'moment/moment';

export class ModuleDateValidator {
  static dateVaidator(AC: AbstractControl) {

    var dateFormat = "DD-MM-YYYY";
    let date: any = {};

    if(AC.value) {
      date = AC.value.day + "-" + AC.value.month + "-" + AC.value.year;
    }

    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate();
    var y = q.getFullYear();

    var current_date = new Date(y,m,d);

    if (AC && AC.value && !moment(date,dateFormat).isValid()) {
    
      return { 'dateVaidator': true };
    
    } else {
      
      if(AC && AC.value && AC.value.year && AC.value.year.toString().length != 4) {
      
        return { 'dateVaidator': true };
      
      } else if(AC && AC.value && AC.value.year && AC.value.year.toString().length == 4) {
        
        const mydate=new Date('"' + AC.value.year + '-' + AC.value.month + '-' + AC.value.day + '"');
        if(current_date > mydate) {
          return { 'dateVaidator': true };
        }
      }
    }
    return null;
  }
}
