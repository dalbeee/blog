export interface IPost {
  title: string;
  content: string;
  description: string;
  id: number;
  thumbnail: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
  };
  comments: [];
}

export interface IUserLoginInfo {
  email: string;
  password: string;
}

interface IUserInfo {
  access_token: string;
  username: string;
  email?: string;
  id?: number;
  blocked?: string;
  confirmed?: string;
  created_at?: string;
  provider?: string;
  role?: object;
  updated_at?: string;
}

export interface PostDTO {
  title: string;
  content: string;
}

export interface CommentDTO {
  body: string;
  user?: {
    username: string;
  };
}
