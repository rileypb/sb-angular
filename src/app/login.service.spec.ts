import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { CableService } from './cable.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ActionCableService } from 'angular2-actioncable';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
  	TestBed.configureTestingModule({
	  	imports: [HttpClientTestingModule, AppRoutingModule],
	  	providers: [CableService, LoginService, ActionCableService]
  	});

  	httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  describe('#init', () => {
  	it('should call api', () => {
      const service: LoginService = TestBed.get(LoginService);
      service.init().subscribe();

      const req = httpTestingController.expectOne('api/me');
      expect(req.request.method).toEqual('GET');
      req.flush({});
  	});

  	it('should report login', () => {
      const service: LoginService = TestBed.get(LoginService);
      let result = null;
      service.init().subscribe(succ => result = succ);

      const req = httpTestingController.expectOne('api/me');
      expect(req.request.method).toEqual('GET');
      req.flush("success result");

      expect(result).toEqual("logged_in");
      expect(service.status).toEqual("logged_in");
  	});

  	it('should report logout', () => {
      const service: LoginService = TestBed.get(LoginService);
      let result = null;
      service.init().subscribe(succ => result = succ);

      const req = httpTestingController.expectOne('api/me');
      expect(req.request.method).toEqual('GET');
      req.flush("");

      expect(result).toEqual("logged_out");
      expect(service.status).toEqual("logged_out");
  	});

  	it('should report error', () => {
      const service: LoginService = TestBed.get(LoginService);
      let result = null;
      service.init().subscribe(succ => result = succ);

      const req = httpTestingController.expectOne('api/me');
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent("something bad"), { status: 400, statusText: "an error occurred" });

      expect(result).toEqual("error");
      expect(service.status).toEqual("error");
      expect(service.error).toEqual("Http failure response for api/me: 400 an error occurred");
  	});

  	it('should clear error on successful operation', () => {
      const service: LoginService = TestBed.get(LoginService);
      let result = null;
      service.init().subscribe(succ => result = succ);

      const req = httpTestingController.expectOne('api/me');
      expect(req.request.method).toEqual('GET');
      req.error(new ErrorEvent("something bad"), { status: 400, statusText: "an error occurred" });

      service.init().subscribe(succ => result = succ);

      const req2 = httpTestingController.expectOne('api/me');
      expect(req2.request.method).toEqual('GET');
      req2.flush("success result");

      expect(result).toEqual("logged_in");
      expect(service.status).toEqual("logged_in");
      expect(service.error).toBeNull();
  	});
  });
});
