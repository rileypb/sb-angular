import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuItemComponent } from './sidemenu-item.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';

describe('SidemenuItemComponent', () => {
  let component: SidemenuItemComponent;
  let fixture: ComponentFixture<SidemenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuItemComponent ],
      imports: [ AppRoutingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
