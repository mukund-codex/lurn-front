import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAnswerReportComponent } from './quiz-answer-report.component';

describe('QuizAnswerReportComponent', () => {
  let component: QuizAnswerReportComponent;
  let fixture: ComponentFixture<QuizAnswerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizAnswerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAnswerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
