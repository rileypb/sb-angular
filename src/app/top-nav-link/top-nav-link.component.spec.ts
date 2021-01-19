import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavLinkComponent } from './top-nav-link.component';

describe('TopNavLinkComponent', () => {
  let component: TopNavLinkComponent;
  let fixture: ComponentFixture<TopNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
