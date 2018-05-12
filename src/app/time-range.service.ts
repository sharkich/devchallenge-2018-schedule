import {Injectable} from '@angular/core';
import {TIME_RANGE_KIND, TimeRangeModel} from './time-range.model';
import {Http} from '@angular/http';

@Injectable()
export class TimeRangeService {

  constructor(private http: Http) { }

  public init(): Promise<TimeRangeModel[]> {
    return this.http.get('/assets/schedule-original-fix.json')
      .toPromise()
      .then((res) => {
        return res.json().map((obj) => new TimeRangeModel(obj));
      });
  }

  public createSchedule(formData: any): TimeRangeModel[] {
    console.log('create from', formData);
    const result: TimeRangeModel[] = [];

    // Sleep
    this._addRange(result, new TimeRangeModel({
      start: `${formData.sleep.start.hour}:${formData.sleep.start.minutes}`,
      end: `${formData.sleep.end.hour}:${formData.sleep.end.minutes}`,
      kind: TIME_RANGE_KIND.sleep,
      title: 'Sleep',
      height: 0
    }));
    // Wake up
    this._addRange(result, new TimeRangeModel({
      start: `${formData.sleep.end.hour}:${formData.sleep.end.minutes}`,
      end: `${formData.sleep.end.hour}:${formData.sleep.end.minutes}`,
      kind: TIME_RANGE_KIND.sleep,
      title: 'Wake up',
      height: 2
    }));
    // Fall asleep
    this._addRange(result, new TimeRangeModel({
      start: `${formData.sleep.start.hour}:${formData.sleep.start.minutes}`,
      end: `${formData.sleep.start.hour}:${formData.sleep.start.minutes}`,
      kind: TIME_RANGE_KIND.sleep,
      title: 'Fall asleep',
      height: 2
    }));

    // Heavy traffic on the way to work
    this._addRange(result, new TimeRangeModel({
      start: `${formData.trafficToWork.start.hour}:${formData.trafficToWork.start.minutes}`,
      end: `${formData.trafficToWork.end.hour}:${formData.trafficToWork.end.minutes}`,
      kind: TIME_RANGE_KIND.background,
      title: 'Heavy traffic on the way to work',
      height: 0
    }));
    // Heavy traffic on the way to home
    this._addRange(result, new TimeRangeModel({
      start: `${formData.trafficToHome.start.hour}:${formData.trafficToHome.start.minutes}`,
      end: `${formData.trafficToHome.end.hour}:${formData.trafficToHome.end.minutes}`,
      kind: TIME_RANGE_KIND.background,
      title: 'Heavy traffic on the way to home',
      height: 0
    }));

    // Way to work
    this._addRange(result, new TimeRangeModel({
      start: `${formData.wayToWork.start.hour}:${formData.wayToWork.start.minutes}`,
      end: `${formData.wayToWork.end.hour}:${formData.wayToWork.end.minutes}`,
      kind: TIME_RANGE_KIND.red,
      title: '', // Transport
      height: 0
    }));
    this._addRange(result, new TimeRangeModel({
      start: `${formData.wayToWork.start.hour}:${formData.wayToWork.start.minutes}`,
      end: `${formData.wayToWork.end.hour}:${formData.wayToWork.end.minutes}`,
      kind: TIME_RANGE_KIND.title,
      background: 'transparent',
      title: 'Transport',
      height: 0
    }));

    // Way to home
    this._addRange(result, new TimeRangeModel({
      start: `${formData.wayToHome.start.hour}:${formData.wayToHome.start.minutes}`,
      end: `${formData.wayToHome.end.hour}:${formData.wayToHome.end.minutes}`,
      kind: TIME_RANGE_KIND.red,
      title: '', // Transport
      height: 0
    }));
    this._addRange(result, new TimeRangeModel({
      start: `${formData.wayToHome.start.hour}:${formData.wayToHome.start.minutes}`,
      end: `${formData.wayToHome.end.hour}:${formData.wayToHome.end.minutes}`,
      kind: TIME_RANGE_KIND.title,
      background: 'transparent',
      title: 'Transport',
      height: 0
    }));

    // Work Starts
    this._addRange(result, new TimeRangeModel({
      start: `${formData.work.start.hour}:${formData.work.start.minutes}`,
      end: `${formData.work.start.hour}:${formData.work.start.minutes}`,
      kind: TIME_RANGE_KIND.red,
      title: 'Work Starts',
      height: 2
    }));
    // Work Ends
    this._addRange(result, new TimeRangeModel({
      start: `${formData.work.end.hour}:${formData.work.end.minutes}`,
      end: `${formData.work.end.hour}:${formData.work.end.minutes}`,
      kind: TIME_RANGE_KIND.red,
      title: 'Work Ends',
      height: 2
    }));
    this._addRange(result, new TimeRangeModel({
      start: `${formData.work.start.hour}:${formData.work.start.minutes}`,
      end: `${formData.work.end.hour}:${formData.work.end.minutes}`,
      kind: TIME_RANGE_KIND.title,
      background: 'green',
      title: 'Activity at work',
      height: 0
    }));
    this._addRange(result, new TimeRangeModel({
      start: `${formData.wayToHome.end.hour}:${formData.wayToHome.end.minutes}`,
      end: `${formData.sleep.start.hour}:${formData.sleep.start.minutes}`,
      kind: TIME_RANGE_KIND.title,
      background: 'green',
      title: 'Activity at home',
      height: 0
    }));
    // Work Flow
    // this._addRange(result, new TimeRangeModel({
    //   start: `${formData.work.start.hour}:${formData.work.start.minutes}`,
    //   end: `${formData.work.end.hour}:${formData.work.end.minutes}`,
    //   kind: TIME_RANGE_KIND.work,
    //   title: 'Work Flow',
    //   height: 0
    // }));

    console.log('result', result);
    return result;
  }

  private _addRange(ranges: TimeRangeModel[], timeRange: TimeRangeModel) {
    if (timeRange.hourEnd < timeRange.hourStart) {
      const timeRangeBefore24 = new TimeRangeModel(timeRange);
      timeRangeBefore24.setEnd('24:00');
      ranges.push(timeRangeBefore24);

      const timeRangeAfter24 = new TimeRangeModel(timeRange);
      timeRangeAfter24.setStart('00:00');
      ranges.push(timeRangeAfter24);
    } else {
      ranges.push(timeRange);
    }
  }

}
