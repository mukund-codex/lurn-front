import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDownloadComponent } from './share-download.component';

describe('ShareDownloadComponent', () => {
  let component: ShareDownloadComponent;
  let fixture: ComponentFixture<ShareDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
