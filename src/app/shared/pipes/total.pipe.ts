import { Pipe, PipeTransform } from '@angular/core';

// décorateur
@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(item: any, tva?: boolean) {
    // value correspond à la valeur passée au pipe total
    //console.log(item, 'item');

    if(tva){
      return item.totalTTC();
    }
    return item.totalHT();


    // if(tva){
    //   return value * coef * (1 + tva/100);
    // }
    // return value * coef;

  }

}
