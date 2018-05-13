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
import {DialogEditTimeRangeComponent} from './dialog-edit-time-range/dialog-edit-time-range.component';
import {SvgService} from './svg.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SvgTimeChartComponent,
    DialogCreateNewScheduleComponent,
    DialogEditTimeRangeComponent
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
    MatStepperModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    TimeRangeService,
    SvgService
  ],
  entryComponents: [
    DialogCreateNewScheduleComponent,
    DialogEditTimeRangeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
