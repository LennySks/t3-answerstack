"use server";

import { api } from "~/trpc/server";

interface ThreadPostsProps {
  threadId: string;
}

export async function ThreadPosts({ threadId }: ThreadPostsProps) {
  const posts = await api.posts.getPostsFromThreadId(threadId);

  if (!posts || posts.length === 0) {
    return <div>No posts!</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.createdAt.toString()}</p>
        </div>
      ))}
    </div>
  );
}
