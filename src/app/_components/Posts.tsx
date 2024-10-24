import { api } from "~/trpc/server";

export default async function Posts() {
  const posts = await api.posts.getPosts();

  return (
    <div className="flex flex-col gap-4">
      {[...posts, ...posts, ...posts, ...posts, ...posts].map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
