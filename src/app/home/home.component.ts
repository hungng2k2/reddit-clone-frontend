import { Observable, map } from 'rxjs';
import { Component } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostModel } from '../interface/post.payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  posts$: Observable<PostModel[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.posts$.pipe(
      map(response => {
        return response.data!
      })
    )
  }
}
