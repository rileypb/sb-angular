import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { Project } from '../project';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let project:Project;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    project = {id:1, name:"Test Project"};
    component.project = project;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
