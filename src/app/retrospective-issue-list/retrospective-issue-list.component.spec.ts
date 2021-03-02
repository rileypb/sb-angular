import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrospectiveIssueListComponent } from './retrospective-issue-list.component';

describe('RetrospectiveIssueListComponent', () => {
  let component: RetrospectiveIssueListComponent;
  let fixture: ComponentFixture<RetrospectiveIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrospectiveIssueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrospectiveIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
