export interface Post {
  id: number;
  threadId: number;
  title: string;
  content: string;
  image?: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  // VoteCount
  // Visibility
  // Comments
}
