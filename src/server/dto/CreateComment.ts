export interface Comment {
  postId: number;
  userId: string;
  parrentCommentId: number;
  // VoteCount
  content: string;
}
