import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSpaceReportComponent } from './free-space-report.component';

describe('FreeSpaceReportComponent', () => {
  let component: FreeSpaceReportComponent;
  let fixture: ComponentFixture<FreeSpaceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeSpaceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeSpaceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
