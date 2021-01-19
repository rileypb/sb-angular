import { TestBed } from '@angular/core/testing';

import { EpicsService } from './epics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EpicsService', () => {
  let service: EpicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(EpicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
