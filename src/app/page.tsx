import Posts from "~/app/_components/Posts";
import { HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <HydrateClient>
      <main className="container mx-auto flex flex-col items-center justify-center p-4">
        {/*TODO: Create Post for joined thread.*/}
        {/*<div>*/}
        {/*  <Button>Post</Button>*/}
        {/*</div>*/}
        <div className="w-full max-w-7xl">
          <Posts />
        </div>
      </main>
    </HydrateClient>
  );
}
