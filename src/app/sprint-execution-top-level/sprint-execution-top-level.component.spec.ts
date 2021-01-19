import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintExecutionTopLevelComponent } from './sprint-execution-top-level.component';

describe('SprintExecutionTopLevelComponent', () => {
  let component: SprintExecutionTopLevelComponent;
  let fixture: ComponentFixture<SprintExecutionTopLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintExecutionTopLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintExecutionTopLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
