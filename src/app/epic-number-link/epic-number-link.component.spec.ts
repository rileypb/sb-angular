import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicNumberLinkComponent } from './epic-number-link.component';

describe('EpicNumberLinkComponent', () => {
  let component: EpicNumberLinkComponent;
  let fixture: ComponentFixture<EpicNumberLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicNumberLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicNumberLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
