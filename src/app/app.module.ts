import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxEchartsModule } from 'ngx-echarts';
import { ColorPickerModule } from 'ngx-color-picker';

import { ProjectsComponent } from './projects/projects.component';

import { LoginService } from './login.service';
import { CableService } from './cable.service';
import { ProjectService } from './project.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { IssuesService } from './issues.service';
import { LocationService } from './location.service';
import { UiStateService } from './ui-state.service';
import { DataService } from './data.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SprintBacklogItemComponent } from './sprint-backlog-item/sprint-backlog-item.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../shared/material.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { EditIssueDialogComponent } from './edit-issue-dialog/edit-issue-dialog.component';
import { SprintCardComponent } from './sprint-card/sprint-card.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CkEditorComponent } from './ckeditor/ckeditor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FocusMonitor } from '@angular/cdk/a11y';
import { EditSprintDialogComponent } from './edit-sprint-dialog/edit-sprint-dialog.component';
import { MenuContainerComponent } from './menu-container/menu-container.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidemenuItemComponent } from './sidemenu-item/sidemenu-item.component';
import { ProjectTeamComponent } from './project-team/project-team.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { EpicDetailComponent } from './epic-detail/epic-detail.component';
import { EpicsComponent } from './epics/epics.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { BurndownComponent } from './burndown/burndown.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { UserViewComponent } from './user-view/user-view.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { RichDateComponent } from './rich-date/rich-date.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityEntryComponent } from './activity-entry/activity-entry.component';
import { IssueNumberLinkComponent } from './issue-number-link/issue-number-link.component';
import { TaskNumberLinkComponent } from './task-number-link/task-number-link.component';
import { SprintNumberLinkComponent } from './sprint-number-link/sprint-number-link.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { SprintExecutionComponent } from './sprint-execution/sprint-execution.component';
import { SprintRetrospectiveComponent } from './sprint-retrospective/sprint-retrospective.component';
import { EpicListComponent } from './epic-list/epic-list.component';
import { ProjectFrameComponent } from './project-frame/project-frame.component';
import { EpicsTopLevelComponent } from './epics-top-level/epics-top-level.component';
import { ProductBacklogTopLevelComponent } from './product-backlog-top-level/product-backlog-top-level.component';
import { TopNavLinkComponent } from './top-nav-link/top-nav-link.component';
import { SprintPlanningTopLevelComponent } from './sprint-planning-top-level/sprint-planning-top-level.component';
import { DashboardTopLevelComponent } from './dashboard-top-level/dashboard-top-level.component';
import { SprintExecutionTopLevelComponent } from './sprint-execution-top-level/sprint-execution-top-level.component';
import { SprintRetrospectiveTopLevelComponent } from './sprint-retrospective-top-level/sprint-retrospective-top-level.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { EpicFormComponent } from './epic-form/epic-form.component';
import { TshirtSizeComponent } from './tshirt-size/tshirt-size.component';
import { ColorPickerFormControlComponent } from './color-picker-form-control/color-picker-form-control.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { EpicIssueListComponent } from './epic-issue-list/epic-issue-list.component';
import { ProjectIssueListComponent } from './project-issue-list/project-issue-list.component';
import { SprintPlanningComponent } from './sprint-planning/sprint-planning.component';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { CurrentSprintComponent } from './current-sprint/current-sprint.component';
import { EpicNumberLinkComponent } from './epic-number-link/epic-number-link.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintIssueListComponent } from './sprint-issue-list/sprint-issue-list.component';
import { IssueLoadingWrapperComponent } from './issue-loading-wrapper/issue-loading-wrapper.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { SprintFrameComponent } from './sprint-frame/sprint-frame.component';
import { SprintExecutionInnerComponent } from './sprint-execution-inner/sprint-execution-inner.component';
import { SprintIssueStateListComponent } from './sprint-issue-state-list/sprint-issue-state-list.component';
import { ExpandableIssueListComponent } from './expandable-issue-list/expandable-issue-list.component';
import { CheckableTaskListComponent } from './checkable-task-list/checkable-task-list.component';
import { CheckableTaskEntryComponent } from './checkable-task-entry/checkable-task-entry.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { Api } from './api';
import { UserInfoService } from './user-info.service';

import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { environment } from '../environments/environment';
import { ProjectActivityListComponent } from './project-activity-list/project-activity-list.component';
import { StartSprintComponent } from './start-sprint/start-sprint.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { RetrospectiveIssueListComponent } from './retrospective-issue-list/retrospective-issue-list.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import { IssueFormDialogComponent } from './issue-form-dialog/issue-form-dialog.component';
import { IssueLoaderComponent } from './issue-loader/issue-loader.component';
import { SprintRetrospectiveReportComponent } from './sprint-retrospective-report/sprint-retrospective-report.component';
import { SprintRetrospectiveReportInnerComponent } from './sprint-retrospective-report-inner/sprint-retrospective-report-inner.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TopBarComponent,
    SprintBacklogItemComponent,
    ErrorComponent,
    EditIssueDialogComponent,
    SprintCardComponent,
    BreadcrumbComponent,
    ConfirmDialogComponent,
    CkEditorComponent,
    EditSprintDialogComponent,
    MenuContainerComponent,
    SidemenuComponent,
    SidemenuItemComponent,
    ProjectTeamComponent,
    UserProfileComponent,
    SettingsComponent,
    EpicDetailComponent,
    EpicsComponent,
    IssueDetailComponent,
    ProjectCardComponent,
    BurndownComponent,
    IssueCardComponent,
    UserViewComponent,
    TimeAgoPipe,
    RichDateComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ActivityListComponent,
    ActivityEntryComponent,
    IssueNumberLinkComponent,
    TaskNumberLinkComponent,
    SprintNumberLinkComponent,
    TopnavComponent,
    SprintBacklogComponent,
    ProductBacklogComponent,
    SprintExecutionComponent,
    SprintRetrospectiveComponent,
    EpicListComponent,
    ProjectFrameComponent,
    EpicsTopLevelComponent,
    ProductBacklogTopLevelComponent,
    TopNavLinkComponent,
    SprintPlanningTopLevelComponent,
    DashboardTopLevelComponent,
    SprintExecutionTopLevelComponent,
    SprintRetrospectiveTopLevelComponent,
    DashboardContentComponent,
    EpicFormComponent,
    TshirtSizeComponent,
    ColorPickerFormControlComponent,
    IssueListComponent,
    EpicIssueListComponent,
    ProjectIssueListComponent,
    SprintPlanningComponent,
    IssueFormComponent,
    CurrentSprintComponent,
    EpicNumberLinkComponent,
    SprintListComponent,
    SprintIssueListComponent,
    IssueLoadingWrapperComponent,
    TaskCardComponent,
    SprintFrameComponent,
    SprintExecutionInnerComponent,
    SprintIssueStateListComponent,
    ExpandableIssueListComponent,
    CheckableTaskListComponent,
    CheckableTaskEntryComponent,
    SprintFormComponent,
    UserProfileFormComponent,
    ProjectActivityListComponent,
    StartSprintComponent,
    InfoDialogComponent,
    RetrospectiveIssueListComponent,
    UserSelectorComponent,
    TeamSummaryComponent,
    IssueFormDialogComponent,
    IssueLoaderComponent,
    SprintRetrospectiveReportComponent,
    SprintRetrospectiveReportInnerComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    CKEditorModule,
    MatFormFieldModule,
    MatInputModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    ColorPickerModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        ...environment.httpInterceptor,
      },
    }),
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  	ActionCableService,
  	ProjectService,
  	LoginService,
  	CableService,
    IssuesService,
    LocationService,
    UiStateService,
    FocusMonitor,
    DataService,
    Api,
    UserInfoService,
  ],
  bootstrap: [AppComponent],
  exports: [MaterialModule,
    MatFormFieldModule,
    MatInputModule],
})
export class AppModule { }
