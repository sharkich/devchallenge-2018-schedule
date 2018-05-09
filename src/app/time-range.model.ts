export const TIME_RANGE_KIND = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  title: 'title',
  work: 'work',
  sleep: 'sleep',
  background: 'background'
};

export interface ITimeRangeModel {
  start: string;
  end: string;

  kind: string;

  title: string;

  height: number;
  background?: string;
}

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

  constructor(data: ITimeRangeModel) {
    this.kind = data.kind;

    this.start = data.start;
    const startTime = data.start.split(':');
    this._hourStart = +startTime[0];
    this._minutesStart = +startTime[1];

    this.end = data.end;
    const endTime = data.end.split(':');
    this._hourEnd = +endTime[0];
    this._minutesEnd = +endTime[1];

    this.title = data.title;

    this.height = +data.height;
    this.background = data.background;
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
