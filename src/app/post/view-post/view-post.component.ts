import { Observable, map } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/interface/post.payload';
import { PostService } from 'src/app/shared/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/interface/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  postId: number;
  post$: Observable<PostModel>;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments$: Observable<CommentPayload[]>;

  constructor(private postService: PostService, private commentService: CommentService, private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.post$ = this.postService.post$(this.postId).pipe(
      map(res => res.data!)
    )
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    })
    this.commentPayload = {
      text: '',
      postId: this.postId
    }
    this.comments$ = this.commentService.allCommentsForPost$(this.postId)
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment$(this.commentPayload).subscribe({
      next: data => {
        this.commentForm.get('text')?.setValue('');
        this.getCommentsForPost();
      },
      error: console.error
    })
  }

  private getCommentsForPost() {
    this.comments$ = this.commentService.allCommentsForPost$(this.postId)
  }
}
