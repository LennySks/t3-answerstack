# T3 answerstack

## TODO

- [x] Make it deploy (vercel)
- [x] Scaffold basic ui with mock data
- [x] Tidy up build process
- [x] Setup DB (vercel postgres)
  - [x] Adjust tables to fit the app
    - [x] Fix relationships between entities (one to one, one to many, many to many)
    - [x] Add constraints (not null, unique, foreign key)
- [x] Attach DB to UI
- [x] Add Authentication (w/ Clerk) _(Will add another authentication method like nextauth)_
  - [ ] Save user to own DB
    - [x] Sign up user (w/ Clerk)
    - [ ] Fetch the signed up user (User Id from Clerk)
    - [ ] Save user to own DB
    - [ ] (Optional) After sign up, redirect to profile completion where user can choose profile picture, username etc.
- [x] Add Image Upload
- [ ] "taint" (Server only) _not needed_
- [x] Use Next/Image component
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

- Flair

  - Id
  - ThreadId
  - Name
  - Color
  - Description

- PostFlairs
  - Id
  - PostId
  - FlairId
