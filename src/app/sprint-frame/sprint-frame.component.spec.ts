import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintFrameComponent } from './sprint-frame.component';

describe('SprintFrameComponent', () => {
  let component: SprintFrameComponent;
  let fixture: ComponentFixture<SprintFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
