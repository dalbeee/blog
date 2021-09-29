export interface Comment {
  body: string;
  id?: number;
}
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
  comments: Comment[];
}

export interface UserLoginDTO {
  username?: string;
  email?: string;
  password: string;
}

interface IUserLoginResultError {
  isError: boolean;
  message: {
    message?: string;
    target?: string;
    statusCode?: number;
  };
  status: number;
}

interface IUserLoginResultSuccess {
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
