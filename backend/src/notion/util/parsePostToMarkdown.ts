import { NotionBlock } from '../domain/types/notion-block';
import { SubBlock } from '../domain/types/sub-block';

export const parseNotionPostToMarkdown = (post: NotionBlock): string => {
  try {
    const content = post.results.map((block) => {
      const parseSubBlock = (subBlock: SubBlock[]) => {
        return subBlock
          .map((item) => {
            const parseItemLink = (item: SubBlock) => {
              const link = item.text?.link?.url;
              return link ? `[${item.plain_text}](${link})` : item.plain_text;
            };

            const parsedItem = parseItemLink(item);

            return parsedItem;
          })
          .join(' ');
      };

      switch (block.type) {
        case 'heading_1': {
          const subBlock = block['heading_1'].text;
          const result = parseSubBlock(subBlock);
          return `# ${result}`;
        }
        case 'heading_2': {
          const subBlock = block['heading_2'].text;
          const result = parseSubBlock(subBlock);
          return `## ${result}`;
        }
        case 'heading_3': {
          const subBlock = block['heading_3'].text;
          const result = parseSubBlock(subBlock);
          return `### ${result}`;
        }
        case 'paragraph': {
          const subBlock = block['paragraph'].text;
          const result = parseSubBlock(subBlock);
          return result;
        }
        case 'bold': {
          const subBlock = block['bold'].text;
          const result = parseSubBlock(subBlock);
          return `**${result}**`;
        }
        case 'italic': {
          const subBlock = block['italic'].text;
          const result = parseSubBlock(subBlock);
          return `_${result}_`;
        }
        case 'quote': {
          const subBlock = block['quote'].text;
          const result = parseSubBlock(subBlock);
          return `> ${result}`;
        }
        case 'numbered_list': {
          const subBlock = block['numbered_list'].text;
          const result = parseSubBlock(subBlock);
          return `1. ${result}`;
        }
        case 'code': {
          const subBlock = block['code'].text;
          const result = parseSubBlock(subBlock);
          return `\`\`\`\n${result}\n\`\`\``;
        }
        case 'image': {
          const subBlock = block['image'];
          const result = subBlock.file.url;
          return `![image](${result || '#'})`;
        }

        default:
          return null;
      }
    });

    return content.join(`\n\n`);
  } catch (error) {
    throw new Error();
  }
};
