import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetrackerComponent } from './livetracker.component';

describe('LivetrackerComponent', () => {
  let component: LivetrackerComponent;
  let fixture: ComponentFixture<LivetrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivetrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivetrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
