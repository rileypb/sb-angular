import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichDateComponent } from './rich-date.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

describe('RichDateComponent', () => {
  let component: RichDateComponent;
  let fixture: ComponentFixture<RichDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeAgoPipe, RichDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
