import { Directive, OnInit, OnDestroy, ElementRef, Inject, Input } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  /**
   * Whether the styles are scoped or not.
   */
  @Input() scoped = false;

  private _destroy$ = new Subject();

  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeService,
    @Inject(DOCUMENT) private _document: any
  ) {}

  ngOnInit() {
    const active = this._themeService.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }

    this._themeService.themeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Update the theme on the scoped element.
   */
  updateTheme(theme: Theme) {

    if (theme.fonts) {
      let head  = this._document.getElementsByTagName('head')[0];
      let link  = this._document.createElement('link');
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = theme.fonts;
      head.appendChild(link);
    }

    const element = this.getElement();

    // project properties onto the element
    for (const key in theme.properties) {
      element.style.setProperty(key, theme.properties[key]);
    }

    // remove old theme
    for (const name of this._themeService.theme) {
      element.classList.remove(`${name}-theme`);
    }

    // alias element with theme name
    element.classList.add(`${theme.name}-theme`);
  }

  /**
   * Element to attach the styles to.
   */
  getElement() {
    return this.scoped ? this._elementRef.nativeElement : this._document.body;
  }

}