// const modules = {
//   toolbar: {
//     container: [
//       ["bold", "italic", "underline", "strike"], // toggled buttons
//       ["blockquote", "code-block"],

//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }], // superscript/subscript
//       [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//       [{ direction: "rtl" }], // text direction

//       [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],

//       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//       [{ font: [] }],
//       [{ align: [] }],
//       ["link", "image", "formula"],
//       ["clean"],
//     ],
//   },
// };

import { useRef, useState, useEffect, RefObject } from "react";
import Quill, { QuillOptionsStatic } from "quill";

const theme = "snow";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],

    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "indent",
  "size",
  "header",
  "link",
  "image",
  "video",
  "color",
  "background",
  "clean",
];

function assign(target, _varArgs) {
  "use strict";
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

export const useQuill = (
  options: QuillOptionsStatic | undefined = { theme, modules, formats }
) => {
  const quillRef: RefObject<any> = useRef();

  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState(null);

  const [obj, setObj] = useState({
    Quill: undefined as any | undefined,
    quillRef,
    quill: undefined as Quill | undefined,
    editorRef: quillRef,
    editor: undefined as Quill | undefined,
  });

  useEffect(() => {
    if (!obj.Quill) {
      obj.Quill = require("quill") as Quill;
    }
    if (obj.Quill && !obj.quill && quillRef && quillRef.current && isLoaded) {
      const opts = assign(options, {
        // modules: assign(modules, options.modules),
        modules: {},
        formats: options.formats || formats,
        theme: options.theme || theme,
        placeholder: "content",
      });

      const quill = new obj.Quill(quillRef.current, opts);

      setObj(assign(assign({}, obj), { quill, editor: quill }));
    }
    setIsLoaded(true);
  }, [obj.Quill]);

  // TODO obj 행동 파악후 코드 최적화
  // ? setContent 를 해야 훅을 사용하는 컴포넌트에서 editor.root.innerHTML이 동작한다. 왜?
  const eventTrigger = () =>
    obj?.quill &&
    obj?.quill?.on("text-change", () =>
      setContent(obj?.quill?.container.firstChild.innerHTML)
    );

  useEffect(() => {
    eventTrigger();
  }, [obj]);

  return obj;
};
