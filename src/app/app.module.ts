import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TimeRangeService} from './time-range.service';
import {HttpModule} from '@angular/http';
import {SvgTimeChartComponent} from './svg-time-chart/svg-time-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgTimeChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    TimeRangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
