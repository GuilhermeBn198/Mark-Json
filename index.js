const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

function convertMarkdownToJson(markdown) {
  const tokens = md.parse(markdown, {});
  const result = [];
  let listStack = [];

  tokens.forEach(token => {
    if (token.type === 'heading_open') {
      const level = token.tag;
      const content = tokens[tokens.indexOf(token) + 1].content;
      result.push({ type: level, content });
    }

    if (token.type === 'paragraph_open') {
      const contentToken = tokens[tokens.indexOf(token) + 1];
      result.push({ type: 'p', content: contentToken.content });
    }

    if (token.type === 'bullet_list_open') {
      listStack.push({ type: 'ul', items: [] });
    }

    if (token.type === 'ordered_list_open') {
      listStack.push({ type: 'ol', items: [] });
    }

    if (token.type === 'list_item_open') {
      const contentToken = tokens[tokens.indexOf(token) + 2]; // skip inline
      const item = contentToken.content;
      listStack[listStack.length - 1].items.push(item);
    }

    if (token.type === 'bullet_list_close' || token.type === 'ordered_list_close') {
      const list = listStack.pop();
      result.push(list);
    }
  });

  return result;
}

module.exports = { convertMarkdownToJson };
