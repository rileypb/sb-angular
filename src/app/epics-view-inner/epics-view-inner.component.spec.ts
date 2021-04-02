import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicsViewInnerComponent } from './epics-view-inner.component';

describe('EpicsViewInnerComponent', () => {
  let component: EpicsViewInnerComponent;
  let fixture: ComponentFixture<EpicsViewInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicsViewInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicsViewInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
