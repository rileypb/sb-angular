import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-teacher-report',
  templateUrl: './teacher-report.component.html',
  styleUrls: ['./teacher-report.component.css']
})
export class TeacherReportComponent implements OnInit {
  @Input() teacherReport:any;

  text() {
    return JSON.stringify(this.teacherReport);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
