import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TimechartComponent} from './timechart/timechart.component';
import {TimeRangeService} from './time-range.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TimechartComponent
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
export class AppModule { }
