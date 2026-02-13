import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicsComponent } from './epics.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SyncService } from '../sync.service';
import { CableService } from '../cable.service';
import { ActionCableService } from 'angular2-actioncable';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EpicsComponent', () => {
  let component: EpicsComponent;
  let fixture: ComponentFixture<EpicsComponent>;
  let params: ParamMap = convertToParamMap({'id': 123});
  let syncSpy: any = jasmine.createSpyObj('SyncService', ["syncOn"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EpicsComponent],
    imports: [AppRoutingModule],
    providers: [{ provide: SyncService, useValue: syncSpy }, CableService, ActionCableService, { provide: ActivatedRoute, useValue: { snapshot: { paramMap: params } } }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
