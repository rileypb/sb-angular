import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleIssuesListComponent } from './simple-issues-list.component';

describe('SimpleIssuesListComponent', () => {
  let component: SimpleIssuesListComponent;
  let fixture: ComponentFixture<SimpleIssuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleIssuesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleIssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
