import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintPlanningTopLevelComponent } from './sprint-planning-top-level.component';

describe('SprintPlanningTopLevelComponent', () => {
  let component: SprintPlanningTopLevelComponent;
  let fixture: ComponentFixture<SprintPlanningTopLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintPlanningTopLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintPlanningTopLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
