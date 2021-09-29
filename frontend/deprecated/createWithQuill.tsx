import { forwardRef, useCallback, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { PostDTO } from "..";
import { createPost } from "../util/axios";
import { useRouter } from "next/router";

// import { Editor } from "@toast-ui/react-editor";

import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import "codemirror/lib/codemirror.css";
import {
  TuiEditorWithForwardedProps,
  EditorPropsWithHandlers,
} from "../hooks/useTuiEditor";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import("../hooks/useTuiEditor"),
  { ssr: false }
);

const EditorWithForwardedRef = forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

const create = (props) => {
  if (typeof window === "undefined") return null;

  const ref = useRef<EditorType>();

  const handleChange = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const instance = ref.current.getInstance();
    const valueType = props.valueType || "markdown";
    props.onChange(
      valueType === "markdown" ? instance.getMarkdown() : instance.getHtml()
    );
  }, [props, ref]);

  const router = useRouter();

  // const { turndown, operation } = useTurndown();
  // const { editor, quillRef } = useQuill();

  const [title, setTitle] = useState<null | string>(null);

  const onSubmit = async () => {
    // const content = operation.getConvertedMarkDown;

    const content = ref.current?.getInstance().getMarkdown();
    const postData: PostDTO = { title, content };
    await createPost(postData);
    router.push("/");
  };

  // useEffect(() => {
  //   operation.tryConvertMarkDown(editor?.root.innerHTML);
  // }, [editor?.root.innerHTML]);

  return (
    <div className="flex flex-col w-full bg-gray-200 h-content min-h-content">
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="w-full h-12 px-2 bg-gray-200 border border-gray-300 focus:outline-none"
        placeholder="title"
      />
      {/* <div style={{ width: 300, height: 500 }}> */}
      {/* qill */}
      {/* <div ref={quillRef} /> */}
      {/* </div> */}
      <EditorWithForwardedRef
        ref={ref}
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
      />

      {/* <ReactMarkdown className="marked">
        {operation.getConvertedMarkDown}
      </ReactMarkdown> */}

      <button
        onClick={onSubmit}
        className="w-full px-2 py-1 bg-gray-700 rounded-xl text-gray-50"
      >
        submit
      </button>
    </div>
  );
};

export default create;
