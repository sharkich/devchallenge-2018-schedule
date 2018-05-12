export const TIME_RANGE_KIND = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',

  title: 'title',
  background: 'background',

  work: 'work',
  sleep: 'sleep'
};

export interface ITimeRangeModel {
  start: string;
  end: string;

  kind: string;

  title: string;

  height: number;
  background?: string;
}

const DEFAULT_TIME_RANGE: ITimeRangeModel = {
  start: '00:00',
  end: '24:00',
  kind: TIME_RANGE_KIND.blue,
  title: 'New Range',
  height: 0
};

export class TimeRangeModel implements ITimeRangeModel {

  public start: string;
  public end: string;

  public kind: string;

  public title: string;

  public height: number;
  public background?: string;

  private _hourStart: number;
  private _minutesStart: number;
  private _hourEnd: number;
  private _minutesEnd: number;

  constructor(data: ITimeRangeModel = DEFAULT_TIME_RANGE) {
    this.kind = data.kind;

    this.setStart(data.start);
    this.setEnd(data.end);

    this.title = data.title;

    this.height = +data.height;
    this.background = data.background;
  }

  public setStart(start: string = '0:0') {
    this.start = start;
    const startTime = start.split(':');
    this._hourStart = +startTime[0];
    this._minutesStart = +startTime[1];
  }

  public setEnd(end: string = '24:00') {
    this.end = end;
    const endTime = end.split(':');
    this._hourEnd = +endTime[0];
    this._minutesEnd = +endTime[1];
  }

  get hourStart() {
    return this._hourStart;
  }

  get minutesStart() {
    return this._minutesStart;
  }

  get hourEnd() {
    return this._hourEnd;
  }

  get minutesEnd() {
    return this._minutesEnd;
  }

}
