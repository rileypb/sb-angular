import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompareComponent } from './task-compare.component';

describe('TaskCompareComponent', () => {
  let component: TaskCompareComponent;
  let fixture: ComponentFixture<TaskCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
