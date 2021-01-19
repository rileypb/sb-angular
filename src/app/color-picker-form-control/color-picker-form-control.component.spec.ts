import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerFormControlComponent } from './color-picker-form-control.component';

describe('ColorPickerFormControlComponent', () => {
  let component: ColorPickerFormControlComponent;
  let fixture: ComponentFixture<ColorPickerFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
