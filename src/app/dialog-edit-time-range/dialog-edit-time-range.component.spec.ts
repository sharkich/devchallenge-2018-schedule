import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogEditTimeRangeComponent} from './dialog-edit-time-range.component';

describe('DialogEditTimeRangeComponent', () => {
  let component: DialogEditTimeRangeComponent;
  let fixture: ComponentFixture<DialogEditTimeRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditTimeRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditTimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
