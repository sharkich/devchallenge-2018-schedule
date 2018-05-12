import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateNewScheduleComponent} from './dialog-create-new-schedule.component';

describe('DialogCreateNewScheduleComponent', () => {
  let component: DialogCreateNewScheduleComponent;
  let fixture: ComponentFixture<DialogCreateNewScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateNewScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateNewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
