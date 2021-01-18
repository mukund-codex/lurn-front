import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoCommunicationComponent } from './ho-communication.component';

describe('HoCommunicationComponent', () => {
  let component: HoCommunicationComponent;
  let fixture: ComponentFixture<HoCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoCommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
