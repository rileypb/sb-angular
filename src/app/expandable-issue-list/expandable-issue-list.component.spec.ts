import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableIssueListComponent } from './expandable-issue-list.component';

describe('ExpandableIssueListComponent', () => {
  let component: ExpandableIssueListComponent;
  let fixture: ComponentFixture<ExpandableIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableIssueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
