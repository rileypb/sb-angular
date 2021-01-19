import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { SyncService, Syncer } from '../sync.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { Issue } from '../issue';
import { Project } from '../project';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let syncer:any = {};
  let syncService:SyncService = jasmine.createSpyObj('SyncService', { 'syncOn': syncer});
  let project:Project = { id: 321, name: "my project" }
  let issue:Issue = { id: 1, title: "test issue", description: "this one", estimate: 3, state: "Something", project: project };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [ MatDialogModule, MatSnackBarModule, AppRoutingModule, DragDropModule ],
      providers: [ { provide: SyncService, useValue: syncService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    component.issue = issue;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
