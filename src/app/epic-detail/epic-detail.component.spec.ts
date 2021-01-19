import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicDetailComponent } from './epic-detail.component';

describe('EpicDetailComponent', () => {
  let component: EpicDetailComponent;
  let fixture: ComponentFixture<EpicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
