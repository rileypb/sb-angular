import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableIssueComponent } from './expandable-issue.component';

describe('ExpandableIssueComponent', () => {
  let component: ExpandableIssueComponent;
  let fixture: ComponentFixture<ExpandableIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
