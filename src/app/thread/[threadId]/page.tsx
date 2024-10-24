"use client";

import { Button } from "~/components/ui/button";
import PlusSvg from "~/assets/PlusSvg";
import { ThreadPosts } from "~/app/_components/ThreadPosts";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string }; // Ensure this matches your URL structure
}) {
  const threadId = Number(params.threadId); // Convert to number
  return (
    <>
      <h1>Thread: {params.threadId}</h1>
      <Button type="button" variant="secondary">
        <div className="flex items-center gap-1">
          <PlusSvg color="black" size={18} /> Create Post
        </div>
      </Button>

      {/* Pass the threadId as an object to ThreadPosts */}
      <ThreadPosts threadId={threadId} />
    </>
  );
}
