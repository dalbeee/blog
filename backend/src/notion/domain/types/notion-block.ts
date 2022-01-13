import { Block } from './block';

export interface NotionBlock {
  object: string;
  results: Block[];
}
