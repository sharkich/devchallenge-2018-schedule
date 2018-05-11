import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TIME_RANGE_KIND, TimeRangeModel} from '../time-range.model';

// Edge Blob polyfill https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      const canvas = this;
      setTimeout(() => {
        const binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
          len = binStr.length,
          arr = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], {type: type || 'image/png'}));
      });
    }
  });
}

@Component({
  selector: 'app-svg-time-chart',
  templateUrl: './svg-time-chart.component.html',
  styleUrls: ['./svg-time-chart.component.scss']
})
export class SvgTimeChartComponent implements OnInit {

  @Input() title: string;
  @Input() timeRanges: TimeRangeModel[];

  @ViewChild('svg') svg;
  @ViewChild('canvas') canvas;
  @ViewChild('png') png;

  @ViewChild('uploadFile') uploadFile;

  public svgMargin = 40;

  public svgWidth = 2016;
  public svgWidthFull = this.svgWidth + this.svgMargin * 2;

  public svgHourWidth = Math.round(this.svgWidth / 24);
  public svgHalfWidth = Math.round(this.svgHourWidth / 2);
  public svgQuarterWidth = Math.round(this.svgHourWidth / 4);

  public svgHeight = 400;
  public svgHeightFull = this.svgHeight + this.svgMargin * 2;

  public rangeHeightNormal = 30;
  public rangeHeightHigh = 40;

  public hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  public isDownload = false;
  public downloadLink: string;

  public timeRangesColours: TimeRangeModel[];
  public timeRangesTitles: TimeRangeModel[];
  public timeRangesBackgrounds: TimeRangeModel[];

  constructor() {
  }

  public ngOnInit() {
    this._initData();

    // For downloading
    this.png.nativeElement.onload = () => {
      // add img
      this.canvas.nativeElement
        .getContext('2d')
        .drawImage(this.png.nativeElement,
          0, 0, this.svgWidthFull, this.svgHeightFull,
          0, 0, this.svgWidthFull, this.svgHeightFull);

      // download
      const link = document.createElement('a');
      link.download = `${this.title}.png`;
      link.href = this.canvas.nativeElement.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // this.isDownload = true;
    };

  }

  private _initData() {
    this.timeRangesColours = this.timeRanges
      .filter((timeRange) => [
        TIME_RANGE_KIND.work,
        TIME_RANGE_KIND.sleep,
        TIME_RANGE_KIND.red,
        TIME_RANGE_KIND.green,
        TIME_RANGE_KIND.yellow,
        TIME_RANGE_KIND.blue,
      ].indexOf(timeRange.kind) !== -1);

    this.timeRangesTitles = this.timeRanges
      .filter((timeRange) => TIME_RANGE_KIND.title === timeRange.kind);

    this.timeRangesBackgrounds = this.timeRanges
      .filter((timeRange) => TIME_RANGE_KIND.background === timeRange.kind);
  }

  /**
   * Events handlers
   */

  public onDownloadImage() {
    let data = new XMLSerializer().serializeToString(this.svg.nativeElement);
    data = encodeURIComponent(data);
    this.png.nativeElement.src = 'data:image/svg+xml,' + data;
  }

  public onDownloadData() {
    // download
    const link = document.createElement('a');
    link.download = `${this.title} Data.json`;
    link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.timeRanges));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public onUploadData() {
    this.uploadFile.nativeElement.click();
  }

  public onUploadFile(event) {
    const files = event.srcElement.files;
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();
    fr.onload = (e: any) => {
      try {
        const result = JSON.parse(e.target.result);
        if (!result || !result.length) {
          return;
        }
        this.timeRanges = result.map((obj) => new TimeRangeModel(obj));
        this._initData();
      } catch (e) {
        console.log('error.parse.json', e);
      }
      this.uploadFile.nativeElement.value = '';
    };
    fr.readAsText(files.item(0));
  }

  public onClear() {
    this.timeRanges.length = 0;
    setTimeout(() => {
      this._initData();
    });
  }

  /**
   * Helpers for data in SVG (serializers)
   */

  public rangeHeight(timeRanges: TimeRangeModel): number {
    return timeRanges.height ? this.rangeHeightHigh : this.rangeHeightNormal;
  }

  public rangeX(timeRange: TimeRangeModel): number {
    let x = this.svgMargin + timeRange.hourStart * this.svgHourWidth;
    switch (timeRange.minutesStart) {
      case 45:
        x += this.svgQuarterWidth * 3;
        break;
      case 30:
        x += this.svgQuarterWidth * 2;
        break;
      case 15:
        x += this.svgQuarterWidth;
        break;
    }
    return x;
  }

  public rangeWidth(timeRange: TimeRangeModel): number {
    let hourStart = timeRange.hourStart;
    const hourEnd = timeRange.hourEnd;
    if (hourStart > hourEnd) {
      hourStart = 24 - hourStart;
    }
    const quarters = (hourEnd * 4 + timeRange.minutesEnd / 15) - (hourStart * 4 + timeRange.minutesStart / 15);
    return Math.abs(quarters * this.svgQuarterWidth);
  }

  public rangeColor(timeRange: TimeRangeModel, opacity: number = 0.8): string {
    switch (timeRange.kind) {
      case TIME_RANGE_KIND.blue:
      case TIME_RANGE_KIND.sleep:
        return `rgba(60, 160, 200, ${opacity})`;
      case TIME_RANGE_KIND.red:
        return `rgba(255, 75, 140, ${opacity})`;
      case TIME_RANGE_KIND.green:
      case TIME_RANGE_KIND.work:
        return `rgba(0, 200, 0, ${opacity})`;
      case TIME_RANGE_KIND.yellow:
        if (opacity === 1) {
          return `rgba(240, 180, 30, 1)`;
        }
        return `rgba(255, 230, 50, ${opacity})`;
      case TIME_RANGE_KIND.title:
        if (opacity === 1) {
          return `rgba(0, 0, 0, 1)`;
        }
        if (timeRange.background === 'green') {
          return `rgba(230, 250, 230, ${opacity})`;
        }
        if (timeRange.background === 'transparent') {
          return `rgba(255, 255, 255, ${opacity})`;
        }
        return `rgba(230, 230, 230, ${opacity})`;
      case TIME_RANGE_KIND.background:
        if (opacity === 1) {
          return `rgba(0, 0, 0, 1)`;
        }
        return `rgba(230, 230, 230, ${opacity})`;
      default:
        return `rgba(230, 230, 230, ${opacity})`;
    }
  }

  public rangeTitleX(timeRange: TimeRangeModel): number {
    return this.rangeX(timeRange) + Math.round(this.rangeWidth(timeRange) / 2) + 4;
  }

}
