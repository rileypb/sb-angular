import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from '../projects/projects.component';
import { SprintPlanningTopLevelComponent } from '../sprint-planning-top-level/sprint-planning-top-level.component';
import { SprintBacklogItemComponent } from '../sprint-backlog-item/sprint-backlog-item.component';
import { ProjectTeamComponent } from '../project-team/project-team.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { EpicsTopLevelComponent } from '../epics-top-level/epics-top-level.component';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';
import { ProductBacklogTopLevelComponent } from '../product-backlog-top-level/product-backlog-top-level.component';
import { SprintExecutionTopLevelComponent } from '../sprint-execution-top-level/sprint-execution-top-level.component';
import { SprintRetrospectiveTopLevelComponent } from '../sprint-retrospective-top-level/sprint-retrospective-top-level.component';
import { DashboardTopLevelComponent } from '../dashboard-top-level/dashboard-top-level.component';
import { EpicsViewComponent } from '../epics-view/epics-view.component';

const routes: Routes = [
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'profile', component: UserProfileComponent },
	{ path: 'projects/settings', component: SettingsComponent },
	{ path: 'projects/:id/dashboard', component: DashboardTopLevelComponent },
	{ path: 'projects/:id/planning', component: SprintPlanningTopLevelComponent },
	{ path: 'projects/:id/backlog', component: ProductBacklogTopLevelComponent },
	{ path: 'projects/:id/backlog/:issue_id', component: ProductBacklogTopLevelComponent },
	{ path: 'projects/:id/team', component: ProjectTeamComponent },
	{ path: 'projects/:id/epics', component: EpicsViewComponent },
	{ path: 'projects/:id/epics/:epic_id', component: EpicsViewComponent },
	{ path: 'projects/:id/execution', component: SprintExecutionTopLevelComponent },
	{ path: 'projects/:id/retrospective', component: SprintRetrospectiveTopLevelComponent },
	{ path: '', redirectTo: 'projects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
