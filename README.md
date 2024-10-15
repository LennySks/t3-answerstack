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
- [x] Error management (w/ Sentry)
- [ ] Routing/Image page (parallel route)
- [ ] Delete button (w/ server actions)
- [ ] Analytics (posthog)
- [ ] Ratelimiting (upstash)

## Navigation

- Thread (localhost:3000/[thread])
  - Post (localhost:3000/[thread]/[comments]/[post_id]/[post_title])
