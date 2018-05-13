import {ElementRef, Injectable} from '@angular/core';
import {TIME_RANGE_KIND, TimeRangeModel} from './time-range.model';

@Injectable()
export class SvgService {

  public svgMargin = 40;

  public svgWidth = 1728;
  public svgWidthFull: number;

  public svgHourWidth: number;
  public svgHalfWidth: number;
  public svgQuarterWidth: number;

  public svgHeight = 400;
  public svgHeightFull: number;

  public rangeHeightNormal = 30;
  public rangeHeightHigh = 40;

  public hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  constructor() {
    this.initSizes();
  }

  public initSizes(svgWidth?: number) {
    if (svgWidth) {
      this.svgWidth = svgWidth;
    }

    this.svgWidthFull = this.svgWidth + this.svgMargin * 2;

    this.svgHourWidth = Math.round(this.svgWidth / 24);
    this.svgHalfWidth = Math.round(this.svgHourWidth / 2);
    this.svgQuarterWidth = Math.round(this.svgHourWidth / 4);

    this.svgHeightFull = this.svgHeight + this.svgMargin * 2;
  }

  downloadImageStart(svg: ElementRef, png: ElementRef) {
    let data = new XMLSerializer().serializeToString(svg.nativeElement);
    data = encodeURIComponent(data);
    png.nativeElement.src = 'data:image/svg+xml,' + data;
  }

  downloadImageFinal(canvas: ElementRef, png: ElementRef, title: string) {
    // add img
    canvas.nativeElement
      .getContext('2d')
      .drawImage(png.nativeElement,
        0, 0, this.svgWidthFull, this.svgHeightFull,
        0, 0, this.svgWidthFull, this.svgHeightFull);

    // download
    const link = document.createElement('a');
    link.download = `${title}.png`;
    link.href = canvas.nativeElement.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public rangeHeight(timeRange: TimeRangeModel): number {
    return timeRange.height ? this.rangeHeightHigh : this.rangeHeightNormal;
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

  public rangeTitleY(timeRange: TimeRangeModel): number {
    return timeRange.height === 2 ? 310 : 290;
  }

}
