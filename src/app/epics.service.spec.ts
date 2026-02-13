import { TestBed } from '@angular/core/testing';

import { EpicsService } from './epics.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EpicsService', () => {
  let service: EpicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(EpicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
