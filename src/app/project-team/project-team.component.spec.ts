import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamComponent } from './project-team.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SyncService, Syncer } from '../sync.service';

describe('ProjectTeamComponent', () => {
  let component: ProjectTeamComponent;
  let fixture: ComponentFixture<ProjectTeamComponent>;
  let syncer:any = {};
  let syncService:SyncService = jasmine.createSpyObj('SyncService', { 'syncOn': syncer});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTeamComponent ],
      imports: [ AppRoutingModule ],
      providers: [ { provide: SyncService, useValue: syncService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
