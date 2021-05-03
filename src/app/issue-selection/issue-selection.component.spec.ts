import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSelectionComponent } from './issue-selection.component';

describe('IssueSelectionComponent', () => {
  let component: IssueSelectionComponent;
  let fixture: ComponentFixture<IssueSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
