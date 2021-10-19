### ### frontend todo

- [x]  frontend now only use '/post' api. separate notionPost, Post.
- [x]  separate userAPI logic
- [x]  validation service based on class-validator
- [ ]  refactoring toastAPI service
- [ ]  rendering level middleware
    - [x]  auth router
- [x]  data api level middleware
    - [x]  401 response handler middleware
    - [x]  5xx server error handler middleware
    - [x]  uncaughtedException middleware
        - [ ]  implement logger
- [ ]  admin page
    - [ ]  plug-ins
        - [ ]  notion connector
            - [x]  skeleton
- [ ]  table of content
- [ ]  category view component
- [ ]  infinity scroll

### **### backend todo**

- [x]  convert NotionPost to Post
- [x]  notion sync
    - [x]  create post
    - [x]  patch post
    - [ ]  delete post
    - [ ]  event emitter
- [ ]  triggering interval notion sync using cron
- [ ]  define error type in notionService / findPostsWithOutOfSyncByUpdatedAtField
- [ ]  admin
    - [x]  config

### ### misc

- [ ]  db separate used by e2e testing and dev in docker dev mode

