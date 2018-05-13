import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {TimeRangeService} from '../time-range.service';

@Component({
  selector: 'app-dialog-create-new-schedule',
  templateUrl: './dialog-create-new-schedule.component.html',
  styleUrls: ['./dialog-create-new-schedule.component.scss']
})
export class DialogCreateNewScheduleComponent implements OnInit {

  public hours: number[];

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  public formData = {
    sleep: {
      start: {
        hour: 23,
        minutes: 0
      },
      end: {
        hour: 8,
        minutes: 0
      }
    },
    work: {
      start: {
        hour: 10,
        minutes: 0
      },
      end: {
        hour: 19,
        minutes: 0
      }
    },

    wayToWork: {
      start: {
        hour: 9,
        minutes: 0
      },
      end: {
        hour: 10,
        minutes: 0
      }
    },
    wayToHome: {
      start: {
        hour: 19,
        minutes: 0
      },
      end: {
        hour: 20,
        minutes: 0
      }
    },

    trafficToWork: {
      start: {
        hour: 7,
        minutes: 30
      },
      end: {
        hour: 10,
        minutes: 30
      }
    },
    trafficToHome: {
      start: {
        hour: 17,
        minutes: 0
      },
      end: {
        hour: 19,
        minutes: 30
      }
    }
  };

  public isChangeHeavyTraffic = false;

  constructor(
    private timeRangeService: TimeRangeService,
    public dialogRef: MatDialogRef<DialogCreateNewScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder) {
  }

  public ngOnInit() {
    this.hours = this.timeRangeService.hours();

    this.firstFormGroup = this._formBuilder.group({
      sleepStartHour: [this.formData.sleep.start.hour, Validators.required],
      sleepStartMinutes: [this.formData.sleep.start.minutes, Validators.required],
      sleepEndHour: [this.formData.sleep.end.hour, Validators.required],
      sleepEndMinutes: [this.formData.sleep.end.minutes, Validators.required],

      workStartHour: [this.formData.work.start.hour, Validators.required],
      workStartMinutes: [this.formData.work.start.minutes, Validators.required],
      workEndHour: [this.formData.work.end.hour, Validators.required],
      workEndMinutes: [this.formData.work.end.minutes, Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      wayToWorkStartHour: [this.formData.wayToWork.start.hour, Validators.required],
      wayToWorkStartMinutes: [this.formData.wayToWork.start.minutes, Validators.required],
      wayToWorkEndHour: [this.formData.wayToWork.end.hour, Validators.required],
      wayToWorkEndMinutes: [this.formData.wayToWork.end.minutes, Validators.required],

      wayToHomeStartHour: [this.formData.wayToHome.start.hour, Validators.required],
      wayToHomeStartMinutes: [this.formData.wayToHome.start.minutes, Validators.required],
      wayToHomeEndHour: [this.formData.wayToHome.end.hour, Validators.required],
      wayToHomeEndMinutes: [this.formData.wayToHome.end.minutes, Validators.required],

      trafficToWorkStartHour: [this.formData.trafficToWork.start.hour, Validators.required],
      trafficToWorkStartMinutes: [this.formData.trafficToWork.start.minutes, Validators.required],
      trafficToWorkEndHour: [this.formData.trafficToWork.end.hour, Validators.required],
      trafficToWorkEndMinutes: [this.formData.trafficToWork.end.minutes, Validators.required],

      trafficToHomeStartHour: [this.formData.trafficToHome.start.hour, Validators.required],
      trafficToHomeStartMinutes: [this.formData.trafficToHome.start.minutes, Validators.required],
      trafficToHomeEndHour: [this.formData.trafficToHome.end.hour, Validators.required],
      trafficToHomeEndMinutes: [this.formData.trafficToHome.end.minutes, Validators.required]
    });
  }

  public onNoClick() {
    this.dialogRef.close();
  }

  public onToggleChangeHeavyTraffic() {
    this.isChangeHeavyTraffic = !this.isChangeHeavyTraffic;
  }

  public duration(startH, startM, endH, endM): string {
    return this.timeRangeService.duration(startH, startM, endH, endM);
  }

}
