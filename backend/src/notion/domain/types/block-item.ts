import { SubBlock } from './sub-block';

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
