import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDecimals',
  standalone: true
})
export class TruncateDecimalsPipe implements PipeTransform {

  transform(value: number, decimalPlaces: number): string {
    if (!value) return '0';
    
    const factor = Math.pow(10, decimalPlaces);
    const truncatedValue = Math.floor(value * factor) / factor;
    
    return truncatedValue.toFixed(decimalPlaces);
  }

}
