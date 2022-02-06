import { NotionBlock } from '../domain/types/notion-block';
import { SubBlock, TextSubBlock } from '../domain/types/sub-block';
import { Block } from '../domain/types/block';

const parseDataFromTextSubBlock = (subBlock: TextSubBlock) => {
  if (subBlock.text?.link?.url) {
    const link = subBlock.text?.link?.url;
    return `[${subBlock.plain_text}](${link})`;
  }

  const annotations = subBlock.annotations;
  if (annotations.bold) return `**${subBlock.plain_text}**`;
  if (annotations.italic) return `_${subBlock.plain_text}_`;
  if (annotations.code) return `\`${subBlock.plain_text}\``;

  return subBlock.plain_text;
};

const parsingTextSubBlock = (subBlocks: TextSubBlock[]) => {
  return subBlocks
    .map((subBlock) => {
      const result = parseDataFromTextSubBlock(subBlock);
      return result;
    })
    .join('');
};

const parsingBlock = (blocks: Block[]) => {
  return blocks
    .map((block, index) => {
      if (block.type === 'numbered_list_item') {
        block.numbered_list_item.text[0].plain_text = `${index + 1}. ${
          block.numbered_list_item.text[0].plain_text
        }`;
      }
      return block;
    })

    .map((block) => {
      switch (block.type) {
        case 'heading_1': {
          const subBlockText = block['heading_1'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `## ${result}\n`;
        }
        case 'heading_2': {
          const subBlockText = block['heading_2'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `### ${result}\n`;
        }
        case 'heading_3': {
          const subBlockText = block['heading_3'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `#### ${result}\n`;
        }
        case 'paragraph': {
          const subBlockText = block['paragraph'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `${result}\n`;
        }
        case 'code': {
          const subBlockText = block['code'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `\`\`\`\n${result}\n\`\`\`\n`;
        }
        case 'quote': {
          const subBlockText = block['quote'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `> ${result}\n> \n`;
        }
        case 'numbered_list_item': {
          const subBlockText = block['numbered_list_item'].text;
          const result = parsingTextSubBlock(subBlockText);
          return `${result}\n`;
        }
        case 'bookmark': {
          const url: string = block['bookmark']?.url;
          return `[${url}](${url})\n`;
        }
        case 'image': {
          const subBlock = block['image'];
          const result = subBlock.file.url;
          return `![image](${result || '#'})`;
        }

        default:
          return null;
      }
    })
    .join('\n');
};

export const parseNotionPostToMarkdown = (post: NotionBlock) => {
  try {
    let currentBlockArray: Block[] = [];

    const result = post.results
      .map((block, index) => {
        const currentBlockType = block.type;
        const nextBlockType = post.results[index + 1]?.type;
        currentBlockArray.push(block);

        let result: any = null;

        if (currentBlockType !== nextBlockType || nextBlockType === undefined) {
          result = parsingBlock(currentBlockArray);
          currentBlockArray = [];
        }

        return result;
      })
      .filter((block) => block !== null)
      .join('\n');

    return result;
  } catch (error) {
    throw error;
  }
};
