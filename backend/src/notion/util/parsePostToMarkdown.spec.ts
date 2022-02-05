import * as fs from 'fs';

import { parseNotionPostToMarkdown } from './parsePostToMarkdown';
import { NotionBlock } from '../domain/types/notion-block';

describe('markdown', () => {
  it('', async () => {
    const notionPost: NotionBlock = await JSON.parse(
      fs.readFileSync('./src/notion/util/numbered.json', 'utf8'),
    );
    const data = parseNotionPostToMarkdown(notionPost);

    console.log(data);
  });
});
