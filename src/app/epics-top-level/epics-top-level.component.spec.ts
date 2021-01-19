import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicsTopLevelComponent } from './epics-top-level.component';

describe('EpicsTopLevelComponent', () => {
  let component: EpicsTopLevelComponent;
  let fixture: ComponentFixture<EpicsTopLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicsTopLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicsTopLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
