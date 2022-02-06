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

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: boolean;

  [key: string]: unknown;
}

export interface TextSubBlock {
  type: SubBlockType;
  text?: {
    content: null | string;
    link: null | {
      url: string;
    };
  };
  annotations?: Annotations;
  plain_text: string | null;
  href: null | string;
}

export interface SubBlock {
  type: SubBlockType;
  text?: {
    content: null | string;
    link: null | {
      url: string;
    };
    annotations?: Annotations;
    plain_text: string | null;
    href: null | string;
  }[];
}
