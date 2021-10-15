export interface DatabaseQueryResult {
  results: DatabaseQueryResultChild[];
}

export interface DatabaseQueryResultChild {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: string | null;
  icon: null | {
    type: string;
    emoji: string;
  };
  parent: null | {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    // [key: string]: {
    //   id: string;
    //   type: string;
    //   relation: Array<string>;
    // };
    이름?: {
      id: string;
      type: string;
      title: Array<{
        type: string;
        plain_text: string;
      }>;
    };
  };
  url: null | string;
}

export interface NotionPages {
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
  annotations?: any;
  plain_text: string | null;
  href: null | string;
}

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

export interface NotionBlock {
  object: string;
  results: Block[];
}
