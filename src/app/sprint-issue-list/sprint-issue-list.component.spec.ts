import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintIssueListComponent } from './sprint-issue-list.component';

describe('SprintIssueListComponent', () => {
  let component: SprintIssueListComponent;
  let fixture: ComponentFixture<SprintIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintIssueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
