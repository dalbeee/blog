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
