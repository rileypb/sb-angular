import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtSizeComponent } from './tshirt-size.component';

describe('TshirtSizeComponent', () => {
  let component: TshirtSizeComponent;
  let fixture: ComponentFixture<TshirtSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TshirtSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TshirtSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
