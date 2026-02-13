import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ProjectService } from './project.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProjectService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
  	TestBed.configureTestingModule({
    imports: [],
    providers: [ProjectService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

  	httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  describe('#refresh', () => {
  	it ('should make API call', () => {
    	const service: ProjectService = TestBed.get(ProjectService);
  		service.refresh().subscribe();

  		const req = httpTestingController.expectOne('api/projects');
  		expect(req.request.method).toEqual('GET');

  		req.flush({});
  	});
  });

  describe('#getProject', () => {
  	it ('should make API call', () => {
    	const service: ProjectService = TestBed.get(ProjectService);
  		service.getProject(654).subscribe();

  		const req = httpTestingController.expectOne('api/projects/654');
  		expect(req.request.method).toEqual('GET');

  		req.flush({});
  	});
  });

  describe('#getProjectIssues', () => {
  	it ('should make API call', () => {
    	const service: ProjectService = TestBed.get(ProjectService);
  		service.getProjectIssues(234).subscribe();

  		const req = httpTestingController.expectOne('api/projects/234/issues');
  		expect(req.request.method).toEqual('GET');

  		req.flush({});
  	});
  });
});
