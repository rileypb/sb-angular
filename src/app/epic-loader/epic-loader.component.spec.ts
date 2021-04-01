import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicLoaderComponent } from './epic-loader.component';

describe('EpicLoaderComponent', () => {
  let component: EpicLoaderComponent;
  let fixture: ComponentFixture<EpicLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
