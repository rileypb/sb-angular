import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueActivityComponent } from './issue-activity.component';

describe('IssueActivityComponent', () => {
  let component: IssueActivityComponent;
  let fixture: ComponentFixture<IssueActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
