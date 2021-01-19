import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLoadingWrapperComponent } from './issue-loading-wrapper.component';

describe('IssueLoadingWrapperComponent', () => {
  let component: IssueLoadingWrapperComponent;
  let fixture: ComponentFixture<IssueLoadingWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueLoadingWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLoadingWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
