import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssueDialogComponent } from './edit-issue-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { MaterialModule } from "../../shared/material.module";
import { Issue } from '../issue';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IssuesService } from '../issues.service';
import { HttpClientModule } from '@angular/common/http';
import { CkEditorComponent } from '../ckeditor/ckeditor.component';

describe('EditIssueDialogComponent', () => {
  let component: EditIssueDialogComponent;
  let fixture: ComponentFixture<EditIssueDialogComponent>;
  let issue: Issue = { id: -1, title: "foo", description: "bar", estimate: 2, state: "decrepit", project: { id: 123, name:'p1'}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIssueDialogComponent, CkEditorComponent ],
      imports: [ MaterialModule, BrowserAnimationsModule, HttpClientModule ],
      providers: [ { provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: issue},
        IssuesService,

      ]
    })
    .compileComponents();
  });

  // TestBed.overrideModule(BrowserDynamicTestingModule, {
  //   set: {
  //     entryComponents: [ EditIssueDialogComponent ]
  //   }
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
