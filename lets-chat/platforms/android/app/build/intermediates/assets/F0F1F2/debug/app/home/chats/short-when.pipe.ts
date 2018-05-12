import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { subMinutes } from 'date-fns';
import { subHours } from 'date-fns';
import * as isToday from 'date-fns/is_today';
import * as isYesterday from 'date-fns/is_yesterday';
import * as parse from 'date-fns/parse';
import { device } from 'platform';
import { Config } from '../../core/index';

@Pipe({
  name: 'shortWhen',
  pure: true,
})
export class ShortWhenPipe implements PipeTransform {

  transform(value: number | string | Date): string {
    let language = device.language;
    if (device.region) {
      language += `-${device.region}`;
    }
    const datePipe = new DatePipe(language);
    let parsedDate = parse(value);
    parsedDate = subHours(parsedDate, 5);
    parsedDate = subMinutes(parsedDate, 30);
    const defaultDate = Date.now();
    if (isToday(parsedDate)) {
      return datePipe.transform(parsedDate, 'shortTime');
    }

    if (isYesterday(parsedDate)) {
      return 'yesterday';
    }
    // default date year
    if (parsedDate.getFullYear() === Config.defaultYear) {
      return '';
    }
    return datePipe.transform(parsedDate, 'dd/MM/yy');
  }
}
