

## todo
### frontend
- [x]  frontend use only /post API instead of /notion. separate notion and post.
- [ ]  admin page
    - [ ]  plug-ins
        - [ ]  notion connector
            - [x]  skeleton
- [ ]  table of content
- [ ]  category view component
- [ ]  infinity scroll

### backend
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

### misc
- [ ]  db separate used by e2e testing and dev in docker dev mode