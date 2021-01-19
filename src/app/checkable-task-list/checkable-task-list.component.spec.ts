import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckableTaskListComponent } from './checkable-task-list.component';

describe('CheckableTaskListComponent', () => {
  let component: CheckableTaskListComponent;
  let fixture: ComponentFixture<CheckableTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckableTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckableTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
