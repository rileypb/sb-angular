import { TestBed } from '@angular/core/testing';

import { CableService } from './cable.service';
import { ActionCableService, Channel, Cable  } from 'angular2-actioncable';

describe('CableService', () => {
  let spyACS:any;
  let spyCable:any;

  beforeEach(() => TestBed.configureTestingModule({
  	providers: [
      CableService,
  	  ActionCableService
  	]
  }));

  it('should be created', () => {
    const service: CableService = TestBed.get(CableService);
    expect(service).toBeTruthy();
  });

  it ('should remember channels by name', () => {
    const service: CableService = TestBed.get(CableService);

    spyACS = spyOn(service.cable, "channel").and.callFake( function(arg) { return arg; });
    let c1 = service.channel("c1");
    let c1a = service.channel("c1");
    expect(c1).toEqual(c1a);
    let c2 = service.channel("c2");
    expect(c1).not.toEqual(c2);
    expect(service.cable.channel).toHaveBeenCalledTimes(2);
  });
});
