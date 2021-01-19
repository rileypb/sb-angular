import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { MaterialModule } from "../../shared/material.module";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditSprintDialogComponent } from './edit-sprint-dialog.component';
import { Sprint } from '../sprint';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { CkEditorComponent } from '../ckeditor/ckeditor.component';

describe('EditSprintDialogComponent', () => {
  let component: EditSprintDialogComponent;
  let fixture: ComponentFixture<EditSprintDialogComponent>;
  let sprint: Sprint = { id: 1234, title: 'title', description: '', project: { id: 543, name: 'name'}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSprintDialogComponent, CkEditorComponent ],
      imports: [ MaterialModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule ],
      providers: [ { provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: sprint}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSprintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
