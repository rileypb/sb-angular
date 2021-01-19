import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SyncService, Syncer } from '../sync.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let syncer:any = {};
  let syncService:SyncService = jasmine.createSpyObj('SyncService', { 'syncOn': syncer});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ AppRoutingModule ],
      providers: [ { provide: SyncService, useValue: syncService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
