import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SyncService, Syncer } from '../sync.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let syncer:any = {};
  let syncService:SyncService = jasmine.createSpyObj('SyncService', { 'syncOn': syncer});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ AppRoutingModule ],
      providers: [ { provide: SyncService, useValue: syncService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
