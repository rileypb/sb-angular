import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintExecutionInnerComponent } from './sprint-execution-inner.component';

describe('SprintExecutionInnerComponent', () => {
  let component: SprintExecutionInnerComponent;
  let fixture: ComponentFixture<SprintExecutionInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintExecutionInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintExecutionInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
