import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the JsdatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'jsdate',
})
export class JsdatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    var d = new Date(value*1000);
    var dd = d.getDate();
    var mm = d.getMonth()+1;
    var yy = d.getFullYear();
    var day = d.toLocaleDateString();
    var times = d.toLocaleTimeString();
    var min = d.getMinutes();
    var hour = d.getHours();

    return day+' '+times;
  }
}
