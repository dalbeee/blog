export interface NotionPost {
  id: string;
  title: string;
  author: string;
  url?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
