import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCriterionEntryComponent } from './acceptance-criterion-entry.component';

describe('AcceptanceCriterionEntryComponent', () => {
  let component: AcceptanceCriterionEntryComponent;
  let fixture: ComponentFixture<AcceptanceCriterionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptanceCriterionEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCriterionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
