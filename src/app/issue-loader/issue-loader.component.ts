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
  @Input() issueId:number;

  private sub:Subscription;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  	console.log("ngAfterViewInit");
  	this.dataService.load(`issues/${this.issueId}`, [`issues/${this.issueId}`]);
  	this.sub = this.dataService.values[`issues/${this.issueId}`].subscribe((x) => {
  		console.log(`loaded issue: ${x}`);
  		if (x == null) return;
  		this.components.toArray().forEach(component => {
  			component["issue"] = x;
  		});
  	});
  }

  ngOnDestroy():void {
  	this.dataService.unload(`issues/${this.issueId}`, [`issues/${this.issueId}`]);
  	this.sub.unsubscribe();
  }

}
