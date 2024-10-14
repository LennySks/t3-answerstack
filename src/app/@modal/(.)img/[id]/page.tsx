import { getThread } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid ID");
  const thread = await getThread(idAsNum);

  return (
    <div>
      <img src={thread.image} alt="thread image" className="w-96" />
    </div>
  );
}
