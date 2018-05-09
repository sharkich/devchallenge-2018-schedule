import {Component, Input, OnInit} from '@angular/core';
import {TimeRangeModel} from '../time-range.model';

@Component({
  selector: 'app-timechart',
  templateUrl: './timechart.component.html',
  styleUrls: ['./timechart.component.scss']
})
export class TimechartComponent implements OnInit {

  @Input() timeRanges: TimeRangeModel[];

  public hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  constructor() { }

  public ngOnInit() {
  }

  public getRangeClassesNames(timeRange: TimeRangeModel): string {
    return [
      'time-range',
      `left-index-${this.hours.indexOf(timeRange.hourStart)}`,
      `margin-minutes-${timeRange.minutesStart}`,
      `time-range--width-${this.getRangeLength(timeRange)}`
    ].join(' ');
  }

  private getRangeLength(timeRange: TimeRangeModel): number {
    return (timeRange.hourEnd * 4 + timeRange.minutesEnd / 15) - (timeRange.hourStart * 4 + timeRange.minutesStart / 15);
  }

}
