import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCompareComponent } from './issue-compare.component';

describe('IssueCompareComponent', () => {
  let component: IssueCompareComponent;
  let fixture: ComponentFixture<IssueCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
