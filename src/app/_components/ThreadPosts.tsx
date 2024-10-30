"use server";

import { api } from "~/trpc/server";
import ThreadPostCard from "~/app/_components/ThreadPostCard";
import { type Thread } from "../models/Thread";

interface ThreadPostsProps {
  thread: Thread;
  threadId: string;
}

export async function ThreadPosts({ thread, threadId }: ThreadPostsProps) {
  const posts = await api.posts.getPostsFromThreadId(threadId);

  if (!posts || posts.length === 0) {
    return <div>No posts!</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <ThreadPostCard
            post={post}
            thread={thread}
            comments={[]}
            voteCount={120}
          />
        </div>
      ))}
    </div>
  );
}
