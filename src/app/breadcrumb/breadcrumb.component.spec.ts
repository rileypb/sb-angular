import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { LocationService } from '../location.service';
import { AppRoutingModule } from '../app-routing/app-routing.module';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let locationService:LocationService = new LocationService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbComponent ],
      imports: [ AppRoutingModule ],
      providers: [ { provide: LocationService, useValue: locationService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display breadcrumb', () => {
    locationService.breadcrumb = {path: ['first', 'second', 'third'], links: ['link1', 'link2']};
    fixture.detectChanges();
    const links: any[] = fixture.nativeElement.querySelectorAll(".breadcrumb-link");
    expect(links.length).toEqual(2);
    expect(links[0].innerText).toEqual("first");
    expect(links[1].innerText).toEqual("second");
    expect(links[0].nodeName).toEqual("A");
    expect(links[1].nodeName).toEqual("A");
    expect(links[0].href).toContain("link1");
    expect(links[1].href).toContain("link2");
    const head = fixture.nativeElement.querySelectorAll(".breadcrumb-head");
    expect(head.length).toEqual(1);
    expect(head[0].innerText).toEqual("third");
  });
});
