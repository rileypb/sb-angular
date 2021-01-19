import { Component, OnInit, Input } from '@angular/core';
import { Epic } from '../epic';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-epic-number-link',
  templateUrl: './epic-number-link.component.html',
  styleUrls: ['./epic-number-link.component.css']
})
export class EpicNumberLinkComponent implements OnInit {
  @Input() epic:Epic;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToEpic():void {
    this.router.navigate([`/projects/${this.epic.project.id}/epics/${this.epic.id}`]);
  }

}
