"use client";

import { Button } from "~/components/ui/button";
import PlusSvg from "~/assets/PlusSvg";
import { ThreadPosts } from "~/app/_components/ThreadPosts";
import { Suspense } from "react";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  return (
    <>
      <h1>Thread: {params.threadId}</h1>
      <Button type="button" variant="secondary">
        <div className="flex items-center gap-1">
          <PlusSvg color="black" size={18} /> Create Post
        </div>
      </Button>
      <Suspense key={params.threadId} fallback={<p>Loading posts...</p>}>
        <ThreadPosts threadId={params.threadId} />
      </Suspense>
    </>
  );
}
