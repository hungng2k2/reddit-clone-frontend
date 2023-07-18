import { PostModel } from './../../interface/post.payload';
import { Component, Input } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { VotePayload } from 'src/app/interface/vote.payload';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { VoteType } from 'src/app/interface/votetype.enum';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent {
  @Input() post!: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload;

  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService, private toastr: ToastrService) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.post$(this.post.id).subscribe(res => {
      this.post = res.data!;
    });
  }
}
