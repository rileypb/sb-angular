import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { LoginService } from '../login.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { CableService } from '../cable.service';
import { ActionCableService } from 'angular2-actioncable';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [HttpClientModule, AppRoutingModule, ],
      providers: [LoginService, CableService, ActionCableService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
