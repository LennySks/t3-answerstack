export interface Post {
  id: number;
  threadId: number;
  title: string;
  content: string;
  image?: string | null;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  // VoteCount
  // Visibility
  // Comments
}
