import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintLoaderComponent } from './sprint-loader.component';

describe('SprintLoaderComponent', () => {
  let component: SprintLoaderComponent;
  let fixture: ComponentFixture<SprintLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
