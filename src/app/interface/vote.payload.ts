import { VoteType } from "./votetype.enum";

export interface VotePayload {
  voteType?: VoteType;
  postId?: number;
}
