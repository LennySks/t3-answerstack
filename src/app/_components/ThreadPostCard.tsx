import { ArrowBigDown, ArrowBigUp, MessageSquare, Share } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { type Post } from "~/app/models/Post";
// import { type Comment } from "~/app/models/Comment";
import { type Thread } from "~/app/models/Thread";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface ThreadPostCardProps {
  post: Post;
  voteCount: number;
  comments: Comment[];
  thread: Thread;
}

type Comment = {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  votes: number;
  replies?: Comment[];
};

const commentsData = [
  {
    id: "1",
    user: "NatureLover",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "This is absolutely stunning! The way the colors blend together is magical. Where was this taken?",
    timestamp: "2 hours ago",
    votes: 15,
    replies: [
      {
        id: "2",
        user: "OP",
        avatar: "/placeholder.svg?height=32&width=32",
        content:
          "Thanks! I'm glad you like it. This was taken at Sunset Beach in Hawaii. It's a truly magical place, especially during golden hour.",
        timestamp: "1 hour ago",
        votes: 8,
        replies: [
          {
            id: "5",
            user: "TravelBug",
            avatar: "/placeholder.svg?height=32&width=32",
            content:
              "Sunset Beach is on my bucket list! Did you stay nearby? Any recommendations for accommodations?",
            timestamp: "30 minutes ago",
            votes: 3,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    user: "PhotoExpert",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "Great composition! The silhouette of the palm trees really adds depth to the image. What camera and settings did you use to capture this beautiful moment?",
    timestamp: "1 hour ago",
    votes: 7,
  },
  {
    id: "4",
    user: "SunsetEnthusiast",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "I never get tired of seeing beautiful sunsets like this. It's a reminder of how amazing our world is. Thanks for sharing this piece of paradise with us!",
    timestamp: "45 minutes ago",
    votes: 5,
  },
];

function CommentComponent({
  comment,
  depth = 0,
}: {
  comment: Comment;
  depth?: number;
}) {
  return (
    <div
      className={`mt-4 ${depth > 0 ? "ml-6 border-l-2 border-gray-200 pl-4 dark:border-gray-700" : ""}`}
    >
      <div className="flex items-start space-x-4">
        <img
          className="h-8 w-8"
          src="https://placehold.co/24x24/000000/FFFFFF.svg"
          alt={comment.user}
        />
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="mr-2 font-semibold">{comment.user}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {comment.timestamp}
            </span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-gray-500 hover:text-orange-500"
              >
                <ArrowBigUp className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium">{comment.votes}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-gray-500 hover:text-blue-500"
              >
                <ArrowBigDown className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
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
      {/* Comments section */}
      <div className="bg-gray-100 px-4 py-4 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold">Comments</h3>
        {commentsData.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </Card>
  );
}
