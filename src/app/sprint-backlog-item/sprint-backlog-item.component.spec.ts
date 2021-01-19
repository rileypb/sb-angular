import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBacklogItemComponent } from './sprint-backlog-item.component';

describe('SprintBacklogItemComponent', () => {
  let component: SprintBacklogItemComponent;
  let fixture: ComponentFixture<SprintBacklogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBacklogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBacklogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
