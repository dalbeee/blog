// export interface INotionPages {
//   object: string;
//   id: string;
//   created_time: string;
//   last_edited_time: string;
//   cover: boolean;
//   icon: null | { type: string; emoji: string };
//   parent: null | { type: string; database_id: string };
//   archived: boolean;
//   properties: {
//     isBlogPublished?: boolean;
//     title?: {
//       title: { plain_text: string };
//     };
//   };
// }

// export const NotionPageToPost = (pages: INotionPages): Post => {
//   const result: Post = {
//     id: pages.id,
//     title: pages?.properties?.title.title.plain_text,
//     category: null,
//     comments: [],
//     content: "",
//     createdAt: pages.created_time,
//     updatedAt: pages.last_edited_time,
//     description: "",
//     slug: null,
//     tags: [],
//     thumbnail: null,
//   };

//   return result;
// };
