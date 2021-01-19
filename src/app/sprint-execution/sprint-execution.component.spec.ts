import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintExecutionComponent } from './sprint-execution.component';

describe('SprintExecutionComponent', () => {
  let component: SprintExecutionComponent;
  let fixture: ComponentFixture<SprintExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
