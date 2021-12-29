import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCriterionCompareComponent } from './acceptance-criterion-compare.component';

describe('AcceptanceCriterionCompareComponent', () => {
  let component: AcceptanceCriterionCompareComponent;
  let fixture: ComponentFixture<AcceptanceCriterionCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptanceCriterionCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCriterionCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
