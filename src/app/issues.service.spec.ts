import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SyncService } from './sync.service';
import { CableService } from './cable.service';
import { ActionCableService } from 'angular2-actioncable';

import { IssuesService } from './issues.service';
import { Issue } from './issue';

describe('IssuesService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
  	TestBed.configureTestingModule({ 
	  imports: [HttpClientTestingModule],
      providers: [SyncService, CableService, ActionCableService]
    });

  	httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
  	httpTestingController.verify();
  });

  it('should be created', () => {
    const service: IssuesService = TestBed.get(IssuesService);
    expect(service).toBeTruthy();
  });

  describe('#deleteIssue', () => {
	  it('should make DELETE request', () => {
	    const service: IssuesService = TestBed.get(IssuesService);
	    service.deleteIssue(123).subscribe();

	    const req = httpTestingController.expectOne('api/issues/123');
	    expect(req.request.method).toEqual('DELETE');

	    req.flush({});
	  });
  });

  describe("#createIssue", () => {
  	it('should make POST request', () => {
  		const issue:Issue = {id: -1, title: 'title', description: '', estimate: 1, state: 'Open', project: { id:1234, name: 'p1' }};
	    const service: IssuesService = TestBed.get(IssuesService);
	    service.createIssue(issue).subscribe();

	    const req = httpTestingController.expectOne('api/projects/1234/issues');
	    expect(req.request.method).toEqual('POST');
	    expect(req.request.body).toEqual({issue:issue});

	    req.flush({});
  	});
  });

  describe("#save", () => {
  	it('should make PATCH request', () => {
  		const issue:Issue = {id: 231, title: 'title', description: '', estimate: 1, state: 'Open', project: { id:1234, name: 'p1' }};
	    const service: IssuesService = TestBed.get(IssuesService);
	    service.save(issue).subscribe();

	    const req = httpTestingController.expectOne('api/issues/231');
	    expect(req.request.method).toEqual('PATCH');
	    expect(req.request.body).toEqual({issue:issue});

	    req.flush({});
  	});
  });

  describe("#transfer", () => {
  	it('should make PATCH request', () => {
	    const service: IssuesService = TestBed.get(IssuesService);
	    service.transfer(1,2,'3,4',5,6,'7,8,9');

	    const req = httpTestingController.expectOne('api/transfer');
	    expect(req.request.method).toEqual('PATCH');
	    expect(req.request.body).toEqual({transfer: {projectId1: 1, sprintId1: 2, order1: '3,4', projectId2: 5, sprintId2: 6, order2: "7,8,9"}});

	    req.flush({});
  	});
  });

  describe("#reorder", () => {
  	it('should make PATCH request with null sprint', () => {
	    const service: IssuesService = TestBed.get(IssuesService);
	    service.reorder(1, null, '3,4,5');

	    const req = httpTestingController.expectOne('api/projects/1');
	    expect(req.request.method).toEqual('PATCH');
	    expect(req.request.body).toEqual({ project: { order: '3,4,5' }});

	    req.flush({});
  	});

  	it('should make PATCH request with non-null sprint', () => {
	    const service: IssuesService = TestBed.get(IssuesService);
	    service.reorder(1, 2, '3,4,5');

	    const req = httpTestingController.expectOne('api/projects/1/sprints/2');
	    expect(req.request.method).toEqual('PATCH');
	    expect(req.request.body).toEqual({ sprint: { order: '3,4,5' }});

	    req.flush({});
  	});
  });
});
