import { NotionBlock, SubBlock } from "../repository/types";

export const parseNotionPostToMarkdown = (post: NotionBlock): string => {
  const content = post.results.map((block) => {
    const parseSubBlock = (subBlock: SubBlock[]) => {
      return subBlock
        .map((item) => {
          const parseItemLink = (item: SubBlock) => {
            const link = item.text.link?.url;
            return link ? `(${item.plain_text})[${link}]` : item.plain_text;
          };

          const parsedItem = parseItemLink(item);

          return parsedItem;
        })
        .join(" ");
    };

    switch (block.type) {
      case "heading_1": {
        const subBlock = block["heading_1"].text;
        const result = parseSubBlock(subBlock);
        return `# ${result}`;
      }
      case "heading_2": {
        const subBlock = block["heading_2"].text;
        const result = parseSubBlock(subBlock);
        return `## ${result}`;
      }
      case "heading_3": {
        const subBlock = block["heading_3"].text;
        const result = parseSubBlock(subBlock);
        return `### ${result}`;
      }
      case "paragraph": {
        const subBlock = block["paragraph"].text;
        const result = parseSubBlock(subBlock);
        return result;
      }
      case "code": {
        const subBlock = block["code"].text;
        const result = parseSubBlock(subBlock);
        return `\`\`\`\n${result}\n\`\`\``;
      }
      case "image": {
        const subBlock = block["image"];
        const result = subBlock.file.url;
        return `![image](${result})`;
      }

      default:
        return null;
    }
  });

  return content.join(`\n\n`);
};
