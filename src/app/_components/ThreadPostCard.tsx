import { ArrowBigDown, ArrowBigUp, MessageSquare, Share } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { type Post } from "~/app/models/Post";
import { type Comment } from "~/app/models/Comment";
import { type Thread } from "~/app/models/Thread";

interface ThreadPostCardProps {
  post: Post;
  voteCount: number;
  comments: Comment[];
  thread: Thread;
}

export default function ThreadPostCard({
  post,
  voteCount = 120,
  comments = [],
  thread,
}: ThreadPostCardProps) {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="p-4">
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-orange-500 hover:text-orange-600"
            >
              <ArrowBigUp className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium">{voteCount}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:text-blue-600"
            >
              <ArrowBigDown className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-grow">
            <div className="mb-2 flex items-center gap-1">
              <img
                src="https://placehold.co/24x24/000000/FFFFFF.svg"
                className="rounded-full"
                alt="placeholder image"
                width={24}
                height={24}
              />
              <span className="mr-2 text-sm font-medium">{thread.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {post.createdAt.toDateString()}
              </span>
            </div>
            <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {post.content}
            </p>
            {post.image && (
              <div className="mb-4">
                <Image
                  src={post.image}
                  alt="Post image"
                  width={500}
                  height={300}
                  className="w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-gray-50 px-4 py-2 dark:bg-gray-800">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-300"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          {comments.length} Comments
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-300"
        >
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
