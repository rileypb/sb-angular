import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintSnapshotComponent } from './sprint-snapshot.component';

describe('SprintSnapshotComponent', () => {
  let component: SprintSnapshotComponent;
  let fixture: ComponentFixture<SprintSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
