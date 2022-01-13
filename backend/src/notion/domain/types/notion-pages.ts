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
