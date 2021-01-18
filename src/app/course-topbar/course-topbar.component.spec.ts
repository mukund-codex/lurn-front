import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTopbarComponent } from './course-topbar.component';

describe('CourseTopbarComponent', () => {
  let component: CourseTopbarComponent;
  let fixture: ComponentFixture<CourseTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
