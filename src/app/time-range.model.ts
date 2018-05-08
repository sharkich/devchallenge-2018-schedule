export class TimeRangeModel {

  public hourStart: number;
  public minutesStart: number;
  public hourEnd: number;
  public minutesEnd: number;

  public title: string;

  constructor({hourStart, hourEnd, title, minutesStart, minutesEnd}) {
    this.hourStart = hourStart ? hourStart : 0;
    this.minutesStart = minutesStart ? minutesStart : 0;
    this.hourEnd = hourEnd ? hourEnd : hourStart + 1;
    this.minutesEnd = minutesEnd ? minutesEnd : 0;
    this.title = title ? title : `${this.hourStart}&mdash;${this.hourEnd}`;
  }

}
