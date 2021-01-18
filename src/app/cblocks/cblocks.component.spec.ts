import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CblocksComponent } from './cblocks.component';

describe('CblocksComponent', () => {
  let component: CblocksComponent;
  let fixture: ComponentFixture<CblocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CblocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CblocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
