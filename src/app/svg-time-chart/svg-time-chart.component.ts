import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimeRangeModel} from '../time-range.model';

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

  @Input() timeRanges: TimeRangeModel[];

  @ViewChild('svg') svg;
  @ViewChild('canvas') canvas;
  @ViewChild('png') png;

  public svgMargin = 20;

  public svgWidth = 2016;
  public svgHourWidth = Math.round(this.svgWidth / 24);
  public svgHalfWidth = Math.round(this.svgHourWidth / 2);
  public svgQuarterWidth = Math.round(this.svgHourWidth / 4);

  public svgHeight = 400;

  public hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  public isDownload = false;
  public downloadLink: string;

  constructor() {
  }

  ngOnInit() {
    this.png.nativeElement.onload = () => {

      // add img
      this.canvas.nativeElement
        .getContext('2d')
        .drawImage(this.png.nativeElement, 0, 0, this.svgWidth, this.svgHeight, 0, 0, this.svgWidth, this.svgHeight);

      // download
      const link = document.createElement('a');
      link.download = 'file-name.png';
      link.href = this.canvas.nativeElement.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.png.nativeElement.src = null;
    };
  }

  public onDownload() {
    let data = new XMLSerializer().serializeToString(this.svg.nativeElement);
    data = encodeURIComponent(data);
    this.png.nativeElement.src = 'data:image/svg+xml,' + data;
  }

}
