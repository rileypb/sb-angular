import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLoaderComponent } from './issue-loader.component';

describe('IssueLoaderComponent', () => {
  let component: IssueLoaderComponent;
  let fixture: ComponentFixture<IssueLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
