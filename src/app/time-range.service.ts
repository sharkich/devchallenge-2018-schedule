import {Injectable} from '@angular/core';
import {TimeRangeModel} from './time-range.model';
import {Http} from '@angular/http';

@Injectable()
export class TimeRangeService {

  constructor(private http: Http) { }

  public init(): Promise<TimeRangeModel[]> {
    return this.http.get('/assets/schedule-original-fix.json')
      .toPromise()
      .then((res) => {
        const timeRanges: TimeRangeModel[] = res.json().map((obj) => new TimeRangeModel(obj));
        return timeRanges;
      });
  }
}
