import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicsViewComponent } from './epics-view.component';

describe('EpicsViewComponent', () => {
  let component: EpicsViewComponent;
  let fixture: ComponentFixture<EpicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
