import React, { forwardRef, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import {
  EditorPropsWithHandlers,
  TuiEditorWithForwardedProps,
  EditorType,
} from "../hooks/useTuiEditor";
import UploadFilePond from "../components/UploadFilePond";
import { usePost } from "../hooks/usePost";
import AuthRouter from "../components/core/router/AuthRouter";
import { CreatePostDTO } from "../core/domain";

const EditorWithNoSSR = dynamic<TuiEditorWithForwardedProps>(
  () =>
    import("../hooks/useTuiEditor").then((m) => m.TuiEditorWithForwardedProps),
  { ssr: false }
);

export const EditorComponent = forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <EditorWithNoSSR
    {...props}
    forwardedRef={ref as React.MutableRefObject<EditorType>}
  />
));

const Create = (props) => {
  const postAPI = usePost();
  const router = useRouter();

  const titleRef = useRef(null); // title
  const ref = useRef<EditorType>(); // tui editor
  const fileRef = useRef(null); // from filepond

  const onInsertImages = () => {
    const files = fileRef.current?.props.files
      .map((file) => `![${file}](uploads/${file})`)
      .join("\n");
    ref.current.getInstance().insertText(files);
  };

  const [title, setTitle] = useState<null | string>(null);

  const onSubmit = async () => {
    if (!title) {
      titleRef.current.focus();
      titleRef.current.placeholder = "제목을 입력해주세요";
      titleRef.current.className = `${titleRef.current.className} border-b border-red-400 `;
      return;
    }

    const content = ref.current?.getInstance().getMarkdown();
    const postData: CreatePostDTO = { title, content };
    await postAPI
      .createPost(postData)
      .then(() => {
        router.push("/");
      })
      .catch(() => {});
  };

  return (
    <div className={`flex flex-col w-full  h-content min-h-content `}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className={`w-full h-12 px-2 border-t border-gray-200 focus:outline-none focus:no-underline`}
        placeholder="title"
        ref={titleRef}
      />

      <EditorComponent
        ref={ref}
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
      />
      <UploadFilePond ref={fileRef} />
      <div className="flex justify-center">
        <button
          onClick={onInsertImages}
          className={`w-3/5 px-2 py-1 mb-4 font-semibold text-gray-200 bg-green-400 rounded-xl  
          
            //  ${fileRef.current?.props.files.length ? "block" : "hidden"}
            `}
        >
          본문에 이미지 추가
        </button>
      </div>
      <button
        onClick={onSubmit}
        className="w-full px-2 py-1 bg-gray-700 rounded-xl text-gray-50"
      >
        submit
      </button>
    </div>
  );
};

const AuthEditorComponent = () => {
  return (
    <>
      <AuthRouter role="user">
        <Create />
      </AuthRouter>
    </>
  );
};

export default AuthEditorComponent;
