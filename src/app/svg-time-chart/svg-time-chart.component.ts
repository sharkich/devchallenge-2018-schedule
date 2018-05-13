import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {TimeRangeModel} from '../time-range.model';
import {TimeRangeService} from '../time-range.service';
import {SvgService} from '../svg.service';
import {DialogCreateNewScheduleComponent} from '../dialog-create-new-schedule/dialog-create-new-schedule.component';
import {DialogEditTimeRangeComponent} from '../dialog-edit-time-range/dialog-edit-time-range.component';

/**
 * Main SVG component for Schedule
 */

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

  @ViewChild('svg') svg; // Main element

  @ViewChild('canvas') canvas; // hidden. for download
  @ViewChild('png') png; // hidden. for download

  @ViewChild('uploadFile') uploadFile; // hidden. for upload

  public svgMargin: number;

  public svgWidthFull: number;

  public svgHourWidth: number;
  public svgHalfWidth: number;
  public svgQuarterWidth: number;

  public svgHeight: number;
  public svgHeightFull: number;

  public hours: number[]; // for axises

  public timeRangesColours: TimeRangeModel[];
  public timeRangesTitles: TimeRangeModel[];
  public timeRangesBackgrounds: TimeRangeModel[];

  public id: string; // for unique id

  constructor(
    private timeRangeService: TimeRangeService,
    private svgService: SvgService,
    private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.id = '' + Math.random();

    this.svgMargin = this.svgService.svgMargin;
    this.svgWidthFull = this.svgService.svgWidthFull;
    this.svgHourWidth = this.svgService.svgHourWidth;
    this.svgHalfWidth = this.svgService.svgHalfWidth;
    this.svgQuarterWidth = this.svgService.svgQuarterWidth;
    this.svgHeight = this.svgService.svgHeight;
    this.svgHeightFull = this.svgService.svgHeightFull;
    this.hours = this.timeRangeService.hours();

    this._initData();

    // For downloading
    this.png.nativeElement.onload = () =>
      this.svgService.downloadImageFinal(this.canvas, this.png, this.title);

  }

  /**
   * Dialog for create new Schedule
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
        if (!result) {
          return;
        }
        this.timeRanges.length = 0;
        this.timeRanges = this.timeRangeService.createSchedule(result);
        this._initData();
      });
  }

  /**
   * Events handlers
   */

  /**
   * Dialog new range
   */
  public onAddRange() {
    this.onRangeSelect(new TimeRangeModel(), true);
  }

  /**
   * Download Image
   */
  public onDownloadImage() {
    this.svgService.downloadImageStart(this.svg, this.png);
  }

  /**
   * Download Data
   */
  public onDownloadData() {
    this.timeRangeService.downloadData(this.timeRanges, this.title);
  }

  /**
   * Upload Data
   */
  public onUploadData() {
    this.uploadFile.nativeElement.click();
  }

  /**
   * Upload Data
   * @param event
   * @return {boolean}
   */
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

  /**
   * Clear schedule
   */
  public onClear() {
    this.timeRanges.length = 0;
    this._initData();
  }

  /**
   * Dialog edit range
   * @param {TimeRangeModel} timeRange
   * @param {boolean} isNew
   */
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

  /**
   * Get data from the copy
   */
  public onCopyFrom() {
    this.timeRanges = this.timeRangeService.copyRange(this.copyFrom);
    this._initData();
  }

  /**
   * Update lists from timeRanges
   * @private
   */
  private _initData() {
    setTimeout(() => {
      this.timeRangesColours = this.timeRangeService.generalRangesFiler(this.timeRanges);
      this.timeRangesTitles = this.timeRangeService.titleRangesFiler(this.timeRanges);
      this.timeRangesBackgrounds = this.timeRangeService.backgroundRangesFiler(this.timeRanges);
    });
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

  public duration(range: TimeRangeModel) {
    return this.timeRangeService.durationRange(range);
  }

}
