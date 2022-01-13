import { BlockItem } from './block-item';

export interface Block {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  type: string;

  //   optional
  heading_1?: BlockItem;
  heading_2?: BlockItem;
  heading_3?: BlockItem;
  paragraph?: BlockItem;
  image?: BlockItem;
}
