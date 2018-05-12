import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule} from '@angular/material';

import {AppComponent} from './app.component';
import {SvgTimeChartComponent} from './svg-time-chart/svg-time-chart.component';
import {TimeRangeService} from './time-range.service';
import {DialogCreateNewScheduleComponent} from './dialog-create-new-schedule/dialog-create-new-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgTimeChartComponent,
    DialogCreateNewScheduleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
  ],
  providers: [
    TimeRangeService
  ],
  entryComponents: [
    DialogCreateNewScheduleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
