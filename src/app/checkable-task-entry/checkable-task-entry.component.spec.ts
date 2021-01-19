import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckableTaskEntryComponent } from './checkable-task-entry.component';

describe('CheckableTaskEntryComponent', () => {
  let component: CheckableTaskEntryComponent;
  let fixture: ComponentFixture<CheckableTaskEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckableTaskEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckableTaskEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
