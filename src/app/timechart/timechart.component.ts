import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-timechart',
  templateUrl: './timechart.component.html',
  styleUrls: ['./timechart.component.scss']
})
export class TimechartComponent implements OnInit {

  public hours = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
    console.log(this.hours);
  }

}
