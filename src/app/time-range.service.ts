import {Injectable} from '@angular/core';
import {TIME_RANGE_KIND, TimeRangeModel} from './time-range.model';
import {Http} from '@angular/http';
import {FormGroup} from '@angular/forms';

/**
 * Service for TimeRanges
 */

@Injectable()
export class TimeRangeService {

  constructor(private http: Http) { }

  /**
   * Get init data from JSON
   * @return {Promise<TimeRangeModel[]>}
   */
  public getInitRegularSchedule(): Promise<TimeRangeModel[]> {
    return this.http.get('/assets/regular-schedule.json')
      .toPromise()
      .then((res) => {
        const result: TimeRangeModel[] = res.json().map((obj) => new TimeRangeModel(obj));
        return result;
      });
  }

  /**
   * Get init data from JSON (Optomization)
   * @return {Promise<TimeRangeModel[]>}
   */
  public getInitOptimizedSchedule(): Promise<TimeRangeModel[]> {
    return this.http.get('/assets/optimized-schedule.json')
      .toPromise()
      .then((res) => {
        const result: TimeRangeModel[] = res.json().map((obj) => new TimeRangeModel(obj));
        return result;
      });
  }

  /**
   * Create New Schedule
   * @param formData
   * @return {TimeRangeModel[]}
   */
  public createSchedule(formData: any): TimeRangeModel[] {
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

    return result;
  }

  /**
   * Delete range from the list
   * @param {TimeRangeModel[]} ranges
   * @param {TimeRangeModel} timeRange
   */
  public deleteRange(ranges: TimeRangeModel[], timeRange: TimeRangeModel) {
    const index = ranges.findIndex((range) => range === timeRange);
    ranges.splice(index, 1);
  }

  /**
   * Edit range properties
   * @param {TimeRangeModel} timeRange
   * @param {FormGroup} form
   */
  public editTimeRange(timeRange: TimeRangeModel, form: FormGroup) {
    timeRange.title = form.controls['title'].value;
    timeRange.setStart(`${form.controls['startHour'].value}:${form.controls['startMinutes'].value}`);
    timeRange.setEnd(`${form.controls['endHour'].value}:${form.controls['endMinutes'].value}`);
    timeRange.kind = form.controls['kind'].value;
    timeRange.height = form.controls['height'].value;
  }

  /**
   * Add range to the list
   * @param {TimeRangeModel[]} ranges
   * @param {TimeRangeModel} timeRange
   */
  public addRange(ranges: TimeRangeModel[], timeRange: TimeRangeModel) {
    ranges.push(timeRange);
  }

  /**
   * Get copy of the list
   * @param {TimeRangeModel[]} ranges
   * @return {TimeRangeModel[]}
   */
  public copyRange(ranges: TimeRangeModel[]): TimeRangeModel[] {
    return [].concat(ranges);
  }

  /**
   * Filtering list by range kind
   * @param {TimeRangeModel[]} ranges
   * @return {TimeRangeModel[]}
   */
  public generalRangesFiler(ranges: TimeRangeModel[]): TimeRangeModel[] {
    return ranges.filter((timeRange) => [
      TIME_RANGE_KIND.work,
      TIME_RANGE_KIND.sleep,
      TIME_RANGE_KIND.red,
      TIME_RANGE_KIND.green,
      TIME_RANGE_KIND.yellow,
      TIME_RANGE_KIND.blue,
    ].indexOf(timeRange.kind) !== -1);
  }

  /**
   * Filtering list by title range kind
   * @param {TimeRangeModel[]} ranges
   * @return {TimeRangeModel[]}
   */
  public titleRangesFiler(ranges: TimeRangeModel[]): TimeRangeModel[] {
    return ranges.filter((timeRange) => TIME_RANGE_KIND.title === timeRange.kind);
  }

  /**
   * Filtering list by background range kind
   * @param {TimeRangeModel[]} ranges
   * @return {TimeRangeModel[]}
   */
  public backgroundRangesFiler(ranges: TimeRangeModel[]): TimeRangeModel[] {
    return ranges.filter((timeRange) => TIME_RANGE_KIND.background === timeRange.kind);
  }

  /*
  Files
   */

  /**
   * Ganarate and download JSON from the list
   * @param {TimeRangeModel[]} timeRanges
   * @param {string} title
   */
  downloadData(timeRanges: TimeRangeModel[], title: string) {
    const link = document.createElement('a');
    link.download = `${title}.json`;
    link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(timeRanges));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Uploading and parse JSON file
   * @param {File} file
   * @return {Promise<any>}
   */
  uploadFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = (e: any) => {
        try {
          const result = JSON.parse(e.target.result);
          if (!result || !result.length) {
            return [];
          }

          resolve(result.map((obj) => new TimeRangeModel(obj)));

        } catch (e) {
          console.log('Error: Parsing JSON');
          reject(e);
        }

      };
      fr.readAsText(file);
    });
  }

  /**
   * Get duration of TimeRange
   * @param {TimeRangeModel} range
   * @return {string}
   */
  public durationRange(range: TimeRangeModel): string {
    return this.duration(range.hourStart, range.minutesStart, range.hourEnd, range.minutesEnd);
  }

  /**
   * Get duration between times
   * @param {number} startH
   * @param {number} startM
   * @param {number} endH
   * @param {number} endM
   * @return {string}
   */
  public duration(startH: number, startM: number, endH: number, endM: number): string {
    const _startM = startH * 60 + startM;
    const _endM = endH * 60 + endM;
    let _resM = _endM - _startM;
    if (_resM <= 0) {
      _resM += 24 * 60;
    }
    const resH = Math.floor(_resM / 60);
    const resM = _resM % 60;
    if (resH === 24) {
      return '';
    }
    if (resH === 0) {
      return `${resM}m`;
    }
    if (resM === 0) {
      return `${resH}h`;
    }
    return `${resH}h ${resM}m`;
  }

  public hours(length = 24): number[] {
    return Array.from(Array(length).keys());
  }

  /*
  Private
   */

  /**
   * Add range to the list
   * @param {TimeRangeModel[]} ranges
   * @param {TimeRangeModel} timeRange
   * @private
   */
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
