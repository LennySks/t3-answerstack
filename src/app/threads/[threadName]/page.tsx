export default function PostDetail({
  params,
}: {
  params: { threadName: string };
}) {
  async function getThread() {}

  return (
    <>
      <h1>Thread: {params.threadName}</h1>
    </>
  );
}
