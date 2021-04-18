import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-issue-loader',
  templateUrl: './issue-loader.component.html',
  styleUrls: ['./issue-loader.component.css']
})
export class IssueLoaderComponent implements OnInit {
  @ContentChildren("issueView") components: QueryList<Component>;
  //@Input() issueId:number;

  private sub:Subscription;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.updateData(this.issueId);
  }

  updateData(id:number) {
    if (id == 0) {
      return;
    }
  	this.dataService.load(`issues/${id}`, [`issues/${id}`]);
  	this.sub = this.dataService.values[`issues/${id}`].subscribe((x) => {
  		console.log(`loaded issue: ${x}`);
  		if (x == null) return;
      if (this.components) {
    		this.components.toArray().forEach(component => {
    			component["issue"] = x;
    		});
      }
  	});
  }

  unloadData(id:number) {
    this.dataService.unload(`issues/${id}`, [`issues/${id}`]);
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  @Input() set issueId(value:number) {
    if (this._issueId) {
      this.unloadData(this._issueId);
    }
    this._issueId = value;
    if (this._issueId) {
      this.updateData(this._issueId);
    }
  }
  get issueId():number {
    return this._issueId;
  }
  private _issueId:number;

  ngOnDestroy():void {
    this.unloadData(this._issueId);
  }

}
