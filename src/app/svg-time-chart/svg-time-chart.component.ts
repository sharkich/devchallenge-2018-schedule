import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {TimeRangeModel} from '../time-range.model';
import {TimeRangeService} from '../time-range.service';
import {SvgService} from '../svg.service';
import {DialogCreateNewScheduleComponent} from '../dialog-create-new-schedule/dialog-create-new-schedule.component';
import {DialogEditTimeRangeComponent} from '../dialog-edit-time-range/dialog-edit-time-range.component';

@Component({
  selector: 'app-svg-time-chart',
  templateUrl: './svg-time-chart.component.html',
  styleUrls: ['./svg-time-chart.component.scss']
})
export class SvgTimeChartComponent implements OnInit {

  @Input() title: string;
  @Input() timeRanges: TimeRangeModel[];

  @Input() copyFrom: TimeRangeModel[];
  @Input() copyFromTitle: string;

  @ViewChild('svg') svg;
  @ViewChild('canvas') canvas;
  @ViewChild('png') png;

  @ViewChild('uploadFile') uploadFile;

  public svgMargin: number;

  public svgWidthFull: number;

  public svgHourWidth: number;
  public svgHalfWidth: number;
  public svgQuarterWidth: number;

  public svgHeight: number;
  public svgHeightFull: number;

  public hours: number[];

  public isDownload = false;
  public downloadLink: string;

  public timeRangesColours: TimeRangeModel[];
  public timeRangesTitles: TimeRangeModel[];
  public timeRangesBackgrounds: TimeRangeModel[];

  constructor(
    private timeRangeService: TimeRangeService,
    private svgService: SvgService,
    private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.svgMargin = this.svgService.svgMargin;
    this.svgWidthFull = this.svgService.svgWidthFull;
    this.svgHourWidth = this.svgService.svgHourWidth;
    this.svgHalfWidth = this.svgService.svgHalfWidth;
    this.svgQuarterWidth = this.svgService.svgQuarterWidth;
    this.svgHeight = this.svgService.svgHeight;
    this.svgHeightFull = this.svgService.svgHeightFull;
    this.hours = this.svgService.hours;

    this._initData();

    // For downloading
    this.png.nativeElement.onload = () =>
      this.svgService.downloadImageFinal(this.canvas, this.png, this.title);

  }

  private _initData() {
    setTimeout(() => {
      this.timeRangesColours = this.timeRangeService.generalRangesFiler(this.timeRanges);
      this.timeRangesTitles = this.timeRangeService.titleRangesFiler(this.timeRanges);
      this.timeRangesBackgrounds = this.timeRangeService.backgroundRangesFiler(this.timeRanges);
    });
  }

  /**
   * Events handlers
   */

  public onCreateNew() {
    const dialogRef = this.dialog.open(DialogCreateNewScheduleComponent, {
      width: '800px',
      data: {
        title: this.title
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          return;
        }
        this.timeRanges.length = 0;
        this.timeRanges = this.timeRangeService.createSchedule(result);
        this._initData();
      });
  }

  public onAddRange() {
    this.onRangeSelect(new TimeRangeModel(), true);
  }

  public onDownloadImage() {
    this.svgService.downloadImageStart(this.svg, this.png);
  }

  public onDownloadData() {
    this.timeRangeService.downloadData(this.timeRanges, this.title);
  }

  public onUploadData() {
    this.uploadFile.nativeElement.click();
  }

  public onUploadFile(event) {
    const files = event.srcElement.files;
    if (files.length <= 0) {
      return false;
    }

    this.timeRangeService.uploadFile(files.item(0))
      .then((result: TimeRangeModel[]) => {
        this.uploadFile.nativeElement.value = '';
        this.timeRanges = result;
        this._initData();
      });
  }

  public onClear() {
    this.timeRanges.length = 0;
    this._initData();
  }

  public onRangeSelect(timeRange: TimeRangeModel, isNew = false) {
    const dialogRef = this.dialog.open(DialogEditTimeRangeComponent, {
      width: '600px',
      data: {
        timeRange,
        isNew
      }
    });

    dialogRef.afterClosed()
      .subscribe((result: FormGroup) => {
        if (!result || result.invalid) {
          return;
        }

        if (result['delete']) {
          this.timeRangeService.deleteRange(this.timeRanges, timeRange);
          this._initData();
          return;
        }

        this.timeRangeService.editTimeRange(timeRange, result);

        if (isNew) {
          this.timeRangeService.addRange(this.timeRanges, timeRange);
          this._initData();
        }
      });
  }

  public onCopyFrom() {
    this.timeRanges = this.timeRangeService.copyRange(this.copyFrom);
    this._initData();
  }

  /**
   * Helpers for data in SVG (serializers)
   */

  public rangeHeight(timeRange: TimeRangeModel): number {
    return this.svgService.rangeHeight(timeRange);
  }

  public rangeX(timeRange: TimeRangeModel): number {
    return this.svgService.rangeX(timeRange);
  }

  public rangeWidth(timeRange: TimeRangeModel): number {
    return this.svgService.rangeWidth(timeRange);
  }

  public rangeColor(timeRange: TimeRangeModel, opacity: number = 0.8): string {
    return this.svgService.rangeColor(timeRange, opacity);
  }

  public rangeTitleX(timeRange: TimeRangeModel): number {
    return this.svgService.rangeTitleX(timeRange);
  }

  public rangeTitleY(timeRange: TimeRangeModel): number {
    return this.svgService.rangeTitleY(timeRange);
  }

}
