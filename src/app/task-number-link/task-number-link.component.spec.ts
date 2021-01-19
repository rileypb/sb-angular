import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNumberLinkComponent } from './task-number-link.component';

describe('TaskNumberLinkComponent', () => {
  let component: TaskNumberLinkComponent;
  let fixture: ComponentFixture<TaskNumberLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskNumberLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNumberLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
