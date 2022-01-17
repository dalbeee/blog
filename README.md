### ### frontend todo

- [x]  frontend now only use '/post' api. separate notionPost, Post.
- [x]  separate userAPI logic
- [x]  validation service based on class-validator
- [x]  refactoring toastAPI service
- [x]  rendering level middleware
    - [x]  auth router
- [x]  data api level middleware
    - [x]  401 response handler middleware
    - [x]  5xx server error handler middleware
    - [x]  uncaughtedException middleware
- [ ]  admin page
    - [ ]  plug-ins
        - [ ]  notion connector
            - [x]  skeleton
- [ ]  using logger module
- [ ]  first running component - admin setup
- [ ]  user avatar
- [ ]  user join
- [ ]  table of content
- [ ]  category view component
- [ ]  infinity scroll

### **### backend todo**

- [ ]  notion module
    - [x]  convert NotionPost to Post
    - [ ]  notion sync
        - [x]  create post
        - [x]  patch post
        - [ ]  delete post
- [x]  triggering interval notion sync using cron
- [ ]  admin
    - [x]  config
- [x]  pagination
- [ ]  logger module
- [ ]  alarm module

### ### core todo

- [ ]  logger module
    - [x]  skeleton
- [ ]  alarm module
    - [x]  skeleton - slack

### ### misc

- [ ]  db separate used by e2e testing and dev in docker dev mode
- [ ]  jenkins setup