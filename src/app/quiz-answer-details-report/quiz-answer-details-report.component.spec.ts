import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAnswerDetailsReportComponent } from './quiz-answer-details-report.component';

describe('QuizAnswerDetailsReportComponent', () => {
  let component: QuizAnswerDetailsReportComponent;
  let fixture: ComponentFixture<QuizAnswerDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizAnswerDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAnswerDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
