import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSidebarComponent } from './campaign-sidebar.component';

describe('CampaignSidebarComponent', () => {
  let component: CampaignSidebarComponent;
  let fixture: ComponentFixture<CampaignSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
