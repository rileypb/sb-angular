import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCriteriaCompareListComponent } from './acceptance-criteria-compare-list.component';

describe('AcceptanceCriteriaCompareListComponent', () => {
  let component: AcceptanceCriteriaCompareListComponent;
  let fixture: ComponentFixture<AcceptanceCriteriaCompareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptanceCriteriaCompareListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCriteriaCompareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
