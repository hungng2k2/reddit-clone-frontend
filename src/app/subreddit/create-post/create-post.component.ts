import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { SubredditModel } from 'src/app/interface/subreddit.payload';
import { SubredditService } from '../subreddit.service';
import { CreatePostPayload } from 'src/app/interface/create-post.payload';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  createPostForm: FormGroup;
  subreddits$: Observable<SubredditModel[]>;
  postPayload: CreatePostPayload;

  constructor(private subredditService: SubredditService, private postService: PostService, private router: Router) {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required)
    })
    this.subreddits$ = this.subredditService.subreddits$.pipe(
      map(res => res.data!)
    );
    this.postPayload = {
      postName: '',
      subredditName: '',
      url: '',
      description: ''
    }
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;

    this.postService.createPost$(this.postPayload).subscribe({
      next: data => this.router.navigateByUrl('/'),
      error: console.error
    })
  }
}
