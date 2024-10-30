"use client";

import { ArrowBigDown, ArrowBigUp, MessageSquare, Share } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";

type Comment = {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  votes: number;
  replies?: Comment[];
};

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
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.avatar} alt={comment.user} />
          <AvatarFallback>{comment.user[0].toUpperCase()}</AvatarFallback>
        </Avatar>
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
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
        ))}
    </div>
  );
}

export function PostComments() {
  const postData = {
    title: "Check out this amazing sunset!",
    description:
      "I captured this beautiful sunset at the beach yesterday. The colors were absolutely breathtaking!",
    imageUrl: "/placeholder.svg?height=300&width=500",
    voteCount: 1024,
    commentCount: 5,
    threadName: "r/NaturePics",
    threadIcon: "/placeholder.svg?height=20&width=20",
    postDate: "3 hours ago",
    comments: [
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
    ],
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="p-4">
        <div className="flex">
          {/* Vote buttons */}
          <div className="mr-4 flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-orange-500 hover:text-orange-600"
            >
              <ArrowBigUp className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium">{postData.voteCount}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:text-blue-600"
            >
              <ArrowBigDown className="h-6 w-6" />
            </Button>
          </div>

          {/* Post content */}
          <div className="flex-grow">
            {/* Header section */}
            <div className="mb-2 flex items-center">
              <Image
                src={postData.threadIcon}
                alt={`${postData.threadName} icon`}
                width={20}
                height={20}
                className="mr-2 rounded-full"
              />
              <span className="mr-2 text-sm font-medium">
                {postData.threadName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {postData.postDate}
              </span>
            </div>

            <h2 className="mb-2 text-xl font-semibold">{postData.title}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {postData.description}
            </p>
            {postData.imageUrl && (
              <div className="mb-4">
                <Image
                  src={postData.imageUrl}
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
          {postData.commentCount} Comments
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
        {postData.comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </Card>
  );
}
