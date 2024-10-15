export interface Comment {
  id: number;
  postId: number;
  userId: string;
  parrentCommentId: number;
  // VoteCount
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
