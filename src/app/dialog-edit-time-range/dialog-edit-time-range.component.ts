import {Component, Inject, OnInit} from '@angular/core';
import {DialogCreateNewScheduleComponent} from '../dialog-create-new-schedule/dialog-create-new-schedule.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TIME_RANGE_KIND} from '../time-range.model';

@Component({
  selector: 'app-dialog-edit-time-range',
  templateUrl: './dialog-edit-time-range.component.html',
  styleUrls: ['./dialog-edit-time-range.component.scss']
})
export class DialogEditTimeRangeComponent implements OnInit {

  public hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  public firstFormGroup: FormGroup;

  public formData = {
    title: 'New Time Range',
    start: {
      hour: 12,
      minutes: 30
    },
    end: {
      hour: 13,
      minutes: 15
    },
    kind: TIME_RANGE_KIND.blue,
    height: 0
  };

  constructor(
    public dialogRef: MatDialogRef<DialogCreateNewScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log('init', this.data.timeRange);
    this.formData.title = this.data.timeRange.title;

    this.formData.start.hour = this.data.timeRange.hourStart;
    this.formData.start.minutes = this.data.timeRange.minutesStart;
    this.formData.end.hour = this.data.timeRange.hourEnd;
    this.formData.end.minutes = this.data.timeRange.minutesEnd;

    this.formData.kind = this.data.timeRange.kind;
    this.formData.height = this.data.timeRange.height;

    this.firstFormGroup = this._formBuilder.group({
      title: [this.formData.title],

      startHour: [this.formData.start.hour, Validators.required],
      startMinutes: [this.formData.start.minutes, Validators.required],
      endHour: [this.formData.end.hour, Validators.required],
      endMinutes: [this.formData.end.minutes, Validators.required],

      kind: [this.formData.kind, Validators.required],
      height: [this.formData.height, Validators.required],
    });
  }

  public onNoClick() {
    this.dialogRef.close();
  }

}