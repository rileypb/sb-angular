import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettingsDialogComponent } from './edit-settings-dialog.component';

describe('EditSettingsDialogComponent', () => {
  let component: EditSettingsDialogComponent;
  let fixture: ComponentFixture<EditSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
