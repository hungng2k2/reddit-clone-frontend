import { SubredditService } from './../../subreddit/subreddit.service';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SubredditModel } from 'src/app/interface/subreddit.payload';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent {
  subreddits$: Observable<SubredditModel[]>;
  displayViewAll: boolean = false;

  constructor(private subredditService: SubredditService) {
    this.subreddits$ = this.subredditService.subreddits$.pipe(
      map(res => {
        let data = res.data!
        if (data.length >= 4) {
          this.displayViewAll = true;
          return data.splice(0, 3)
        }
        return data;
      })
    );
  }
}
