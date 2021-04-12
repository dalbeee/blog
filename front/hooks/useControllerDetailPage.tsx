import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { CommentDTO } from "..";
import { createCommentToPostBySlug, postDeleteBySlug } from "../util/axios";

const useCommentController = () => {
  const router = useRouter();

  const [commentInputValue, setCommentInputValue] = useState<CommentDTO>(null);
  const [isCommentWindowActive, setIsCommentWindowActive] = useState(false);

  const submitComment = async (e) => {
    e.preventDefault();
    const result = await createCommentToPostBySlug(
      commentInputValue,
      router.query.slug as string
    );
    toggleCommentWindowVisible();
  };

  const toggleCommentWindowVisible = () =>
    setIsCommentWindowActive((prev) => !prev);

  return {
    commentOperation: {
      setCommentInputValue,
      submitComment,
      toggleCommentWindowVisible,
      isCommentWindowActive,
    },
  };
};

const usePostController = () => {
  const router = useRouter();

  //   TODO implement update method
  const postUpdate = async () => {};
  const postDelete = async () => {
    await postDeleteBySlug(router.query.slug as string);
    router.push("/");
  };

  return {
    postOperation: {
      postUpdate,
      postDelete,
    },
  };
};

const reducer = () => {
  const { commentOperation } = useCommentController();
  const { postOperation } = usePostController();
  return {
    commentOperation,
    postOperation,
  };
};

type reducerType = ReturnType<typeof reducer>;

export const ControllerDetailPageContext = createContext<reducerType | null>(
  null
);

export const ControllerDetailPageProvider = ({ children }) => {
  const useHooks = reducer();
  return (
    <ControllerDetailPageContext.Provider value={useHooks}>
      {children}
    </ControllerDetailPageContext.Provider>
  );
};

export const useControllerDetailPageContext = () => {
  const context = useContext(ControllerDetailPageContext);
  if (!Object.keys(context).length) throw Error("no implement provider");
  return context;
};
