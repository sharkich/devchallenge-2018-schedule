import {Component, OnInit} from '@angular/core';
import {TimeRangeModel} from './time-range.model';
import {TimeRangeService} from './time-range.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public currentSchedule: TimeRangeModel[];
  public optimizedSchedule: TimeRangeModel[];

  constructor(
    private timeRangeService: TimeRangeService) {
  }

  public ngOnInit() {

    /**
     * Get Init general Data from JSON
     */
    this.timeRangeService.getInitRegularSchedule()
      .then((timeRanges: TimeRangeModel[]) => {
        this.currentSchedule = timeRanges;
      })
      .catch(() => {
        this.currentSchedule = [];
      });

    /**
     * Get Init optimized Data from JSON
     */
    this.timeRangeService.getInitOptimizedSchedule()
      .then((timeRanges: TimeRangeModel[]) => {
        this.optimizedSchedule = timeRanges;
      })
      .catch(() => {
        this.optimizedSchedule = [];
      });
  }

}
