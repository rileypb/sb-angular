import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintNumberLinkComponent } from './sprint-number-link.component';

describe('SprintNumberLinkComponent', () => {
  let component: SprintNumberLinkComponent;
  let fixture: ComponentFixture<SprintNumberLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintNumberLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintNumberLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
