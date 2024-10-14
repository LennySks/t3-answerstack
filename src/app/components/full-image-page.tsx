import { getThread } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const thread = await getThread(props.id);
  return <img src={thread.image} alt="thread image" className="w-96" />;
}
