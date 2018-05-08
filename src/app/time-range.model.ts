export class TimeRangeModel {

  public hourStart: number;
  public hourEnd: number;

  public title: string;

  constructor({hourStart, hourEnd, title}) {
    this.hourStart = hourStart ? hourStart : 0;
    this.hourEnd = hourEnd ? hourEnd : hourStart + 1;
    this.title = title ? title : `${this.hourStart}&mdash;${this.hourEnd}`;
  }

}
