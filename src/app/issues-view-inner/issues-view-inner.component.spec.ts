import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesViewInnerComponent } from './issues-view-inner.component';

describe('IssuesViewInnerComponent', () => {
  let component: IssuesViewInnerComponent;
  let fixture: ComponentFixture<IssuesViewInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesViewInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesViewInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
