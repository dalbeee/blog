import { TextSubBlock } from './sub-block';

export type BlockType =
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
  | 'bookmark'
  | 'divider'
  | null;

export interface Block {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  type: BlockType;

  //   optional
  heading_1?: { text?: TextSubBlock[] };
  heading_2?: { text?: TextSubBlock[] };
  heading_3?: { text?: TextSubBlock[] };
  paragraph?: { text?: TextSubBlock[] };
  quote?: { text?: TextSubBlock[] };
  numbered_list_item?: { text?: TextSubBlock[] };
  code?: {
    caption?: [];
    text?: TextSubBlock[];
    language?: 'javascript' | string;
  };
  image?: {
    caption?: [];
    type?: string;
    file?: { url: string; expiry_time: string };
  };
  divider?: {};
  bookmark?: { caption?: []; url?: string };

  [key: string]: unknown;
}
