import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicsViewInnerSmallComponent } from './epics-view-inner-small.component';

describe('EpicsViewInnerSmallComponent', () => {
  let component: EpicsViewInnerSmallComponent;
  let fixture: ComponentFixture<EpicsViewInnerSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicsViewInnerSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicsViewInnerSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
