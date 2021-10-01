export interface INotionPages {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: boolean;
  icon: null | { type: string; emoji: string };
  parent: null | { type: string; database_id: string };
  archived: boolean;
  properties: {
    isBlogPublished?: boolean;
    title?: {
      title: { plain_text: string };
    };
  };
}

export interface BlockItem {
  text?: SubBlock[];

  // image
  caption?: Array<any>;
  type?: string;
  file?: {
    url: string;
    expiry_time: string;
  };
}

export interface SubBlock {
  type: string;
  text: {
    content: null | string;
    link: null | {
      url: string;
    };
  };
  plain_text: string | null;
  href: null | string;
}

export interface IBlock {
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

export interface INotionBlock {
  object: string;
  results: IBlock[];
}
