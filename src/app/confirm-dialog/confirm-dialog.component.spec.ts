import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent, DialogData } from './confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogData: DialogData = { title: 'title', message: 'message'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      providers: [ { provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: dialogData}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
