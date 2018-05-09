import {Component, Input, OnInit} from '@angular/core';
import {TimeRangeModel} from '../time-range.model';

@Component({
  selector: 'app-svg-time-chart',
  templateUrl: './svg-time-chart.component.html',
  styleUrls: ['./svg-time-chart.component.scss']
})
export class SvgTimeChartComponent implements OnInit {

  @Input() timeRanges: TimeRangeModel[];

  public svgMargin = 20;

  public svgWidth = 2016;
  public svgHourWidth = Math.round(this.svgWidth / 24);
  public svgHalfWidth = Math.round(this.svgHourWidth / 2);
  public svgQuarterWidth = Math.round(this.svgHourWidth / 4);

  public svgHeight = 400;

  public hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  constructor() { }

  ngOnInit() {
  }

}
