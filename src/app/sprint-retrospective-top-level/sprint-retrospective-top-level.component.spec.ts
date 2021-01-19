import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintRetrospectiveTopLevelComponent } from './sprint-retrospective-top-level.component';

describe('SprintRetrospectiveTopLevelComponent', () => {
  let component: SprintRetrospectiveTopLevelComponent;
  let fixture: ComponentFixture<SprintRetrospectiveTopLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintRetrospectiveTopLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintRetrospectiveTopLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
