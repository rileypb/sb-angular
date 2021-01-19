import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { LoginService } from '../login.service';
import { LocationService } from '../location.service';
import { SyncService } from '../sync.service'; 
import { ProjectService } from '../project.service';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { CableService } from '../cable.service';
import { ActionCableService } from 'angular2-actioncable';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ],
      imports: [ AppRoutingModule, HttpClientTestingModule ],
      providers: [ SyncService, CableService, ActionCableService, LoginService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    spy = spyOn(component.syncService, "syncOn").and.returnValue({ data: "spaghetti" });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
