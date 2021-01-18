import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUniqueFormDataReportComponent } from './total-unique-form-data-report.component';

describe('TotalUniqueFormDataReportComponent', () => {
  let component: TotalUniqueFormDataReportComponent;
  let fixture: ComponentFixture<TotalUniqueFormDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalUniqueFormDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalUniqueFormDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
