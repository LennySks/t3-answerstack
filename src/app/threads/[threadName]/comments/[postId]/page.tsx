export default function PostDetail({
  params,
}: {
  params: { threadName: string; postId: number };
}) {
  return (
    <>
      <h1>Thread: {params.threadName}</h1>
      <p>Post ID: {params.postId}</p>
    </>
  );
}
