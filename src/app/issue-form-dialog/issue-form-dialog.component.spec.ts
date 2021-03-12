import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormDialogComponent } from './issue-form-dialog.component';

describe('IssueFormDialogComponent', () => {
  let component: IssueFormDialogComponent;
  let fixture: ComponentFixture<IssueFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
