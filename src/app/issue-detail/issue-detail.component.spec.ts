import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDetailComponent } from './issue-detail.component';
import { SyncService, Syncer, SyncListener } from '../sync.service';
import { AppRoutingModule } from '../app-routing/app-routing.module';

describe('IssueDetailComponent', () => {
  let component: IssueDetailComponent;
  let fixture: ComponentFixture<IssueDetailComponent>;
  let syncService: any = {};
  let syncer: any = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueDetailComponent ],
      imports: [ AppRoutingModule ],
      providers: [ { provide: SyncService, useValue: syncService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    syncService.syncOn = jasmine.createSpy('syncOn').and.returnValue(syncer);
    syncer.data = jasmine.createSpy('data').and.returnValue({issues: []});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
