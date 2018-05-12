import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SvgTimeChartComponent} from './svg-time-chart/svg-time-chart.component';
import {TimeRangeService} from './time-range.service';

@NgModule({
  declarations: [
    AppComponent,
    SvgTimeChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    TimeRangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
