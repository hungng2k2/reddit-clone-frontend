import { PostService } from 'src/app/shared/post.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PostModel } from 'src/app/interface/post.payload';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent {
  id: number;
  posts$: Observable<PostModel[]>

  constructor(private activateRoute: ActivatedRoute, private postService: PostService) {
    this.id = this.activateRoute.snapshot.params['id'];
    this.posts$ = this.postService.postsBySubreddit$(this.id).pipe(
      map(res => res.data!)
    )
  }
}
