import { getThread } from "~/server/queries";
import FullPageImageView from "~/app/components/full-image-page";

export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid ID");

  return <FullPageImageView id={idAsNum} />;
}
