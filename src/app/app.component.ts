import {Component, OnInit} from '@angular/core';
import {TimeRangeModel} from './time-range.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public currentSchedule: TimeRangeModel[] = [];

  ngOnInit() {
    this.currentSchedule.push(new TimeRangeModel({
      hourStart: 9,
      hourEnd: 15,
      title: 'Sleep'
    }));
  }

}
