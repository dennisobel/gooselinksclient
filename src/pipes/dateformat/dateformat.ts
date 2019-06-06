import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'dateformat',
})
export class DateformatPipe implements PipeTransform {

  transform(value: string, ...args) {
    // return value.toLowerCase();
    
    console.log(typeof(value))
    let val = value.split(".")
    console.log(val)
    // return val
    let val2 = val[0].split("T")
    // console.log(val2)
    return val2[0] + " " + val2[1]
    // return val[0]
  }
}
