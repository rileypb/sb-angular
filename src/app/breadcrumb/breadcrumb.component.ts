import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(public locationService:LocationService) { }

  ngOnInit(): void {
  }

}
