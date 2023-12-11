import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: string | null): string | null {
    return `${value?.slice(0, 3)} ${value?.slice(3)}`
  }

}
