import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintIssueStateListComponent } from './sprint-issue-state-list.component';

describe('SprintIssueStateListComponent', () => {
  let component: SprintIssueStateListComponent;
  let fixture: ComponentFixture<SprintIssueStateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintIssueStateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintIssueStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
