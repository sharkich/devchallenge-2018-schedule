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

  constructor(private timeRangeService: TimeRangeService) {
  }

  ngOnInit() {
    this.timeRangeService.init()
      .then((timeRanges: TimeRangeModel[]) => {
        this.currentSchedule = timeRanges;
      });
  }

}
