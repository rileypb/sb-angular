import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  @Input() news:any;

  constructor() { }

  ngOnInit(): void {
  }

}
