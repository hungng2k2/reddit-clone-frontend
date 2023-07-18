import { Observable, map } from 'rxjs';
import { SubredditService } from './../subreddit.service';
import { Component } from '@angular/core';
import { SubredditModel } from 'src/app/interface/subreddit.payload';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent {
  subreddits$: Observable<SubredditModel[]>;
  constructor(private subredditService: SubredditService) {
    this.subreddits$ = this.subredditService.subreddits$.pipe(
      map(res => res.data!)
    )
  }
}
