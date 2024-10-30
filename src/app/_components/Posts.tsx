import { api } from "~/trpc/server";
import { useThreadsStore } from "~/store";
import PostCard from "./PostCard";

export default async function Posts() {
  const posts = await api.posts.getPosts();
  const threads = await api.threads.getThreads(); // Fetch threads

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} voteCount={120} threads={threads} />
      ))}
    </div>
  );
}
