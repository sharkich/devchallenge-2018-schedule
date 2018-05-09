import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SvgTimeChartComponent} from './svg-time-chart.component';

describe('SvgTimeChartComponent', () => {
  let component: SvgTimeChartComponent;
  let fixture: ComponentFixture<SvgTimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgTimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
