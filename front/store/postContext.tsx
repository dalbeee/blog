import { createContext, useContext, useEffect, useState } from "react";
import { IPost } from "..";

const reducer = () => {
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
  return { posts, setPosts };
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
