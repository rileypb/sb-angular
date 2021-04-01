import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-sprint-loader',
  templateUrl: './sprint-loader.component.html',
  styleUrls: ['./sprint-loader.component.css']
})
export class SprintLoaderComponent implements OnInit {
  @ContentChildren("sprintView") components: QueryList<Component>;
  //@Input() sprintId:number;

  private sub:Subscription;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.updateData(this.sprintId);
  }

  updateData(id:number) {
  	this.dataService.load(`sprints/${id}`, [`sprints/${id}`]);
  	this.sub = this.dataService.values[`sprints/${id}`].subscribe((x) => {
  		console.log(`loaded sprint: ${x}`);
  		if (x == null) return;
      if (this.components) {
    		this.components.toArray().forEach(component => {
    			component["sprint"] = x;
    		});
      }
  	});
  }

  unloadData(id:number) {
    this.dataService.unload(`sprints/${id}`, [`sprints/${id}`]);
    this.sub.unsubscribe();
  }

  @Input() set sprintId(value:number) {
    if (this._sprintId) {
      this.unloadData(this._sprintId);
    }
    this._sprintId = value;
    if (this._sprintId) {
      this.updateData(this._sprintId);
    }
  }
  get sprintId():number {
    return this._sprintId;
  }
  private _sprintId:number;

  ngOnDestroy():void {
    this.unloadData(this._sprintId);
  }

}
