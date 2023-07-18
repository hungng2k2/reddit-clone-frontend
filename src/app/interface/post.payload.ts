export interface PostModel {
  id: number;
  postName: string;
  url: string;
  description: string;
  username: string;
  subredditName: string;
  voteCount: number;
  commentCount: number;
  duration: string;
  upVote: boolean;
  downVote: boolean;
}
