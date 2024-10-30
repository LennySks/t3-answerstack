"use client";

import { Button } from "~/components/ui/button";
import PlusSvg from "~/assets/PlusSvg";
import { ThreadPosts } from "~/app/_components/ThreadPosts";
import { Suspense } from "react";
import { useThreadsStore } from "~/store";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  const selectedThread = useThreadsStore((state) => state.selectedThread);

  return (
    <>
      <Button type="button" variant="secondary">
        <div className="flex items-center gap-1">
          <PlusSvg color="black" size={18} /> Create Post
        </div>
      </Button>
      <Suspense key={params.threadId} fallback={<p>Loading posts...</p>}>
        {selectedThread ? (
          <ThreadPosts thread={selectedThread} threadId={params.threadId} />
        ) : (
          <p>No thread selected</p>
        )}
      </Suspense>
    </>
  );
}
