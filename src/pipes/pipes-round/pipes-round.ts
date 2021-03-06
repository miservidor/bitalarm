import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipesRoundPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipesRound',
})
export class PipesRoundPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return Math.round(value/10)*10;
  }
}
