import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsReportComponent } from './course-details-report.component';

describe('CourseDetailsReportComponent', () => {
  let component: CourseDetailsReportComponent;
  let fixture: ComponentFixture<CourseDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
