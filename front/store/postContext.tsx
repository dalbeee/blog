import { createContext, useContext } from "react";
import commentReducer from "./commentReducer";
import postReducer from "./postReducer";

const reducer = () => {
  const post = postReducer();
  const comment = commentReducer();

  const returnType = {
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
