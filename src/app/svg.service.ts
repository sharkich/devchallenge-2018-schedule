import {ElementRef, Injectable} from '@angular/core';
import {TIME_RANGE_KIND, TimeRangeModel} from './time-range.model';

/**
 * Service for SVG and UI of charts
 */

@Injectable()
export class SvgService {

  public svgMargin = 40;

  public svgWidth = 1728;
  public svgWidthFull: number; // size + margin

  public svgHourWidth: number; // 1
  public svgHalfWidth: number; // 1/2
  public svgQuarterWidth: number; // 1/4

  public svgHeight = 400;
  public svgHeightFull: number; // size + margin

  public rangeHeightNormal = 30; // height normal of range zone
  public rangeHeightHigh = 40; // height high of range zone

  constructor() {
    this.initSizes();
  }

  /**
   * Generate sizes
   * @param {number} svgWidth
   */
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

  /**
   * Handle click event
   * @param {ElementRef} svg
   * @param {ElementRef} png
   */
  downloadImageStart(svg: ElementRef, png: ElementRef) {
    let data = new XMLSerializer().serializeToString(svg.nativeElement);
    data = encodeURIComponent(data);
    png.nativeElement.src = 'data:image/svg+xml,' + data;
  }

  /**
   * Handle callback from loading image
   * @param {ElementRef} canvas
   * @param {ElementRef} png
   * @param {string} title
   */
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

  /**
   * Get height of range
   * @param {TimeRangeModel} timeRange
   * @return {number}
   */
  public rangeHeight(timeRange: TimeRangeModel): number {
    return timeRange.height ? this.rangeHeightHigh : this.rangeHeightNormal;
  }

  /**
   * Check range position
   * @param {TimeRangeModel} timeRange
   * @return {number}
   */
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

  /**
   * Get range width
   * @param {TimeRangeModel} timeRange
   * @return {number}
   */
  public rangeWidth(timeRange: TimeRangeModel): number {
    let hourStart = timeRange.hourStart;
    const hourEnd = timeRange.hourEnd;
    if (hourStart > hourEnd) {
      hourStart = 24 - hourStart;
    }
    const quarters = (hourEnd * 4 + timeRange.minutesEnd / 15) - (hourStart * 4 + timeRange.minutesStart / 15);
    return Math.abs(quarters * this.svgQuarterWidth);
  }

  /**
   * Get color of range
   * @param {TimeRangeModel} timeRange
   * @param {number} opacity
   * @return {string}
   */
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

  /**
   * Get Title position
   * @param {TimeRangeModel} timeRange
   * @return {number}
   */
  public rangeTitleX(timeRange: TimeRangeModel): number {
    return this.rangeX(timeRange) + Math.round(this.rangeWidth(timeRange) / 2) + 4;
  }

  /**
   * Get title position
   * @param {TimeRangeModel} timeRange
   * @return {number}
   */
  public rangeTitleY(timeRange: TimeRangeModel): number {
    return timeRange.height === 2 ? 75 : 290;
  }

}
