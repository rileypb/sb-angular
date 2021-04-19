import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-epic-loader',
  templateUrl: './epic-loader.component.html',
  styleUrls: ['./epic-loader.component.css']
})
export class EpicLoaderComponent implements OnInit {
  @ContentChildren("epicView") components: QueryList<Component>;
  //@Input() epicId:number;

  private sub:Subscription;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.updateData(this.epicId);
  }

  updateData(id:number) {
    if (id == 0) {
      return;
    }
  	this.dataService.load(`epics/${id}`, [`epics/${id}`]);
  	this.sub = this.dataService.values[`epics/${id}`].subscribe((x) => {
  		console.log(`loaded epic: ${x}`);
  		if (x == null) return;
      if (this.components) {
    		this.components.toArray().forEach(component => {
    			component["epic"] = x;
    		});
      }
  	});
  }

  unloadData(id:number) {
    this.dataService.unload(`epics/${id}`, [`epics/${id}`]);
    this.sub?.unsubscribe();
  }

  @Input() set epicId(value:number) {
    if (this._epicId) {
      this.unloadData(this._epicId);
    }
    this._epicId = value;
    if (this._epicId) {
      this.updateData(this._epicId);
    }
  }
  get epicId():number {
    return this._epicId;
  }
  private _epicId:number;

  ngOnDestroy():void {
    this.unloadData(this._epicId);
  }

}
