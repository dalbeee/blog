export interface DatabaseQueryResultChild {
  object: string;
  id: string;
  parent: null | {
    type: string;
    database_id: string;
  };
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  created_time: string;
  last_edited_time: string;
  cover: string | null;
  icon: null | {
    type: string;
    emoji: string;
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

    publishToBlog?: {
      id: string;
      type: string;
      select: {
        id: string;
        name: '배포' | null;
      };
    };
  };
  url: null | string;
}
