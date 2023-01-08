import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(value): string[] {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => {
      return value[o]
    });
  }
}
