import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCardComponent } from './sprint-card.component';
import { UiStateService } from '../ui-state.service';

describe('SprintCardComponent', () => {
  let component: SprintCardComponent;
  let fixture: ComponentFixture<SprintCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCardComponent);
    component = fixture.componentInstance;
    component.sprint = {id:1, title: 's1', description: '', project:{id:2, name:'p1'}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
