import { Observable, map } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { CommentPayload } from 'src/app/interface/comment.payload';
import { PostModel } from 'src/app/interface/post.payload';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  username: string;
  posts$: Observable<PostModel[]>;
  comments$: Observable<CommentPayload[]>;
  postLength: number = 0;
  commentLength: number = 0;

  constructor(private activateRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.username = this.activateRoute.snapshot.params['username'];

    this.posts$ = this.postService.postsByUser$(this.username).pipe(
      map(res => {
        this.postLength = res.data!.length;
        return res.data!;
      })
    )
    this.comments$ = this.commentService.allCommentsByUser$(this.username).pipe(
      map(res => {
        this.commentLength = res.length;
        return res;
      })
    )
  }
}
