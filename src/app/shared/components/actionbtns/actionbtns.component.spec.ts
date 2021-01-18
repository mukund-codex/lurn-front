import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionbtnsComponent } from './actionbtns.component';

describe('ActionbtnsComponent', () => {
  let component: ActionbtnsComponent;
  let fixture: ComponentFixture<ActionbtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionbtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionbtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
