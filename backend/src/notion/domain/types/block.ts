import { BlockItem } from './block-item';

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
  heading_1?: BlockItem;
  heading_2?: BlockItem;
  heading_3?: BlockItem;
  paragraph?: BlockItem;
  image?: BlockItem;
  numbered_list_item: BlockItem;
}
