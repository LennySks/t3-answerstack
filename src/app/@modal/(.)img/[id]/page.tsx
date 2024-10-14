import { getThread } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/app/components/full-image-page";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid ID");
  const thread = await getThread(idAsNum);

  return (
    <Modal>
      <FullPageImageView id={thread.id} />
    </Modal>
  );
}
