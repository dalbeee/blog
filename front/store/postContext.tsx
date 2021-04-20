import { createContext, useContext, useEffect, useState } from "react";
import { IPost } from "..";
import { logger } from "../util/logger";
import commentReducer from "./commentReducer";
import postReducer from "./postReducer";

const reducer = () => {
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);

  const store = { posts, setPosts };

  const post = postReducer(store);
  const comment = commentReducer(store);

  useEffect(() => {
    logger(store);
  }, [store, posts]);

  // post.
  const returnType = {
    posts,
    setPosts,

    ...post,
    ...comment,
  };
  return returnType;
};

type ContextReducer = ReturnType<typeof reducer>;

const PostContext = createContext<ContextReducer | null>({} as ContextReducer);

export const PostContextProvider = ({ children }) => {
  const hooks = reducer();
  return <PostContext.Provider value={hooks}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!Object.keys(context).length) {
    throw Error("not implement PostContext provider");
  }
  return context;
};
