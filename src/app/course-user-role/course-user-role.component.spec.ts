import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUserRoleComponent } from './course-user-role.component';

describe('CourseUserRoleComponent', () => {
  let component: CourseUserRoleComponent;
  let fixture: ComponentFixture<CourseUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
