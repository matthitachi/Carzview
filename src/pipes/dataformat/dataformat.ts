import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the DataformatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dataformat',
})
export class DataformatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let d = new Date(value).toString();
    d = d.slice(0, 24);
    return d;
  }
}
