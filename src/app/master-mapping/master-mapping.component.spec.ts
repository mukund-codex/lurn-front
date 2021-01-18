import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMappingComponent } from './master-mapping.component';

describe('MasterMappingComponent', () => {
  let component: MasterMappingComponent;
  let fixture: ComponentFixture<MasterMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
