import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintRetrospectiveReportComponent } from './sprint-retrospective-report.component';

describe('SprintRetrospectiveReportComponent', () => {
  let component: SprintRetrospectiveReportComponent;
  let fixture: ComponentFixture<SprintRetrospectiveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintRetrospectiveReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintRetrospectiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
