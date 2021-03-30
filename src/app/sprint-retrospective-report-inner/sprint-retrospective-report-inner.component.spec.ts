import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintRetrospectiveReportInnerComponent } from './sprint-retrospective-report-inner.component';

describe('SprintRetrospectiveReportInnerComponent', () => {
  let component: SprintRetrospectiveReportInnerComponent;
  let fixture: ComponentFixture<SprintRetrospectiveReportInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintRetrospectiveReportInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintRetrospectiveReportInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
