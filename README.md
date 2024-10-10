# T3 answerstack

## TODO

- [x] Make it deploy (vercel)
- [x] Scaffold basic ui with mock data
- [x] Tidy up build process
- [x] Setup DB (vercel postgres)
  - [ ] Adjust tables to fit the app
    - [ ] Fix relationships between entities (one to one, one to many, many to many)
    - [ ] Add constraints (not null, unique, foreign key)
- [ ] Attach DB to UI
- [ ] Add Authentication (w/ Clerk)
- [ ] Add Image Upload
- [ ] Error management (w/ Sentry)
- [ ] Routing/Image page (parallel route)
- [ ] Delete button (w/ server actions)
- [ ] Analytics (posthog)
- [ ] Ratelimiting (upstash)

## Tables

- Thread

  - Id
  - Name
  - Description
  - Image? (Logo)
  - Banner? (Cover)
  - CreatedAt
  - Members (Will be a count of thread members, doesnt have to be stored in the database. Instead it will be queried when needed)
  - CreatedBy (userId)

- ThreadMembers

  - Id
  - ThreadId
  - UserId
  - Role (admin, member)
  - JoinedAt (date)

- Posts

  - Id
  - ThreadId
  - Title
  - Content
  - Image?
  - authorId (userId)
  - CreatedAt
  - UpdatedAt (edited)
  - VoteCount (from PostVotes)
  - Visibility (public/private)
  - Comments (List of comments)

- Users

  - Id
  - username
  - email
  - password (hashed)
  - Lists of posts (Will be queried when needed, doesnt need to be in the database.)
  - Lists of comments (Will be queried when needed, doesnt need to be in the database.)
  - Profile Picture

- Comments

  - Id
  - postId
  - userId
  - ParentCommentId
  - VoteCount (from CommentVotes)
  - Content (message)
  - CreatedAt
  - UpdatedAt (edited)

- PostVotes

  - Id
  - postId
  - userId
  - vote (upvote/downvote)

- CommentVotes

  - Id
  - commentId
  - userId
  - vote (upvote/downvote)

- Visiblity (Enum)
  - Public
  - Private
  - Hidden
  - Archived
