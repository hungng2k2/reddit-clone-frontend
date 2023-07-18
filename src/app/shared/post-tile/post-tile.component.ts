import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/interface/post.payload';
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  @Input() data: Array<PostModel>;
  faComments = faComments;

  constructor(private router: Router) {
    this.data = [];
  }

  ngOnInit(): void {
  }

  goToPost(id: number) {
    this.router.navigateByUrl(`/view-post/${id}`)
  }

}
