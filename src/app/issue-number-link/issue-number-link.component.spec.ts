import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueNumberLinkComponent } from './issue-number-link.component';

describe('IssueNumberLinkComponent', () => {
  let component: IssueNumberLinkComponent;
  let fixture: ComponentFixture<IssueNumberLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueNumberLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueNumberLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
