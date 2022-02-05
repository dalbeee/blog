export type SubBlockType =
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'paragraph'
  | 'bold'
  | 'italic'
  | 'quote'
  | 'numbered_list_item'
  | 'code'
  | 'image'
  | null;

type Annotation =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'underline'
  | 'code'
  | 'color'
  | null;

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: boolean;
  [key: string]: unknown;
}

export interface SubBlock {
  type: string;
  text: {
    content: null | string;
    link: null | {
      url: string;
    };
  };
  annotations?: Annotations;
  plain_text: string | null;
  href: null | string;
}
