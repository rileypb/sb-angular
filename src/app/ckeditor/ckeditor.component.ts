import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
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

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CkEditorComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class CkEditorComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  static nextId = 0;
  public Editor = ClassicEditor;

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'ckeditor-component';
  id = `ckeditor-component-${CkEditorComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    return this.value == undefined || this.value == null || this.value.length == 0;
  }

  get shouldLabelFloat() {
    // return this.focused || !this.empty;
    return true;
  }

  @Input('aria-describedby') userAriaDescribedBy: string;

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
    this.Editor.disabled = value;
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
    // const controlElement = this._elementRef.nativeElement
    //   .querySelector('.app-ckeditor')!;
    // controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
  	this._focusMonitor.focusVia(this.Editor, 'program');
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
