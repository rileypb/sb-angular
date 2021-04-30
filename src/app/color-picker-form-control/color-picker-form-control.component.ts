import { Component, OnInit, Input, Optional, Self, ElementRef, } from '@angular/core';
import {FocusMonitor} from '@angular/cdk/a11y';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
  Validators
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'sb-color-picker',
  templateUrl: './color-picker-form-control.component.html',
  styleUrls: ['./color-picker-form-control.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: ColorPickerFormControlComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class ColorPickerFormControlComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<string> {
  static nextId = 0;

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'color-picker-component';
  id = `color-picker-component-${ColorPickerFormControlComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnInit(): void {
  }

  get empty() {
    return this.value == undefined || this.value == null || this.value.length == 0;
  }

  get shouldLabelFloat() {
  	return true;
  }

  @Input('aria-describedby') userAriaDescribedBy:string;


  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  public _value:string = "";
  @Input()
  get value(): string | null {
  	// console.log("get value = " + this._value);
    return this._value;
  }
  set value(val: string | null) {
  	console.log("color picker set value = " + val);
    this._value = val;
    this.stateChanges.next();
    this.onChange(val);
  }

  get errorState(): boolean {
    return false;
  }

  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
  }

  onContainerClick() {
  }

  writeValue(val: string | null): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
  	console.log("registerOnChange");
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
