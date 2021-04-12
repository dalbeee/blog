import React, { forwardRef } from "react";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import "codemirror/lib/codemirror.css";

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

export interface Props extends EditorProps {
  onChange(value: string): void;
  valueType?: "markdown" | "html";
}

export interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

export type EditorType = Editor;

export const TuiEditorWithForwardedProps = (
  props: TuiEditorWithForwardedProps
) => <Editor {...props} ref={props.forwardedRef} />;

// const EditorWithNoSSR = dynamic<TuiEditorWithForwardedProps>(
//   () => import("./useTuiEditor").then((m) => m.TuiEditorWithForwardedProps),
//   { ssr: false }
// );

// export const EditorComponent = forwardRef<
//   Editor | undefined,
//   EditorPropsWithHandlers
// >((props, ref) => (
//   <EditorWithNoSSR
//     {...props}
//     forwardedRef={ref as React.MutableRefObject<Editor>}
//   />
// ));

// const useTuiEditor = () => {
//   return { Editor };
// };
// export default useTuiEditor;

// export default EditorComponent;
