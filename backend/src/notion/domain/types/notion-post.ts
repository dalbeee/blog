export interface NotionPost {
  id: string;
  title: string;
  url?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
