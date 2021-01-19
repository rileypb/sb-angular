import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicIssueListComponent } from './epic-issue-list.component';

describe('EpicIssueListComponent', () => {
  let component: EpicIssueListComponent;
  let fixture: ComponentFixture<EpicIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicIssueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
