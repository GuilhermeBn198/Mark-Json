const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

function parseInline(tokens) {
  const result = [];

  if (!tokens) return result;

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === 'text') {
      if (token.content.trim() !== '') {  // <-- filtra texto vazio
        result.push(token.content);
      }
      i++;
    } else if (token.type === 'strong_open') {
      const inner = [];
      i++;
      while (tokens[i] && tokens[i].type !== 'strong_close') {
        inner.push(tokens[i]);
        i++;
      }
      result.push({ type: 'strong', content: parseInline(inner) });
      i++; // skip strong_close
    } else if (token.type === 'em_open') {
      const inner = [];
      i++;
      while (tokens[i] && tokens[i].type !== 'em_close') {
        inner.push(tokens[i]);
        i++;
      }
      result.push({ type: 'em', content: parseInline(inner) });
      i++; // skip em_close
    } else {
      if (token.content && token.content.trim() !== '') {  // filtragem extra para tokens inesperados
        result.push(token.content);
      }
      i++;
    }
  }

  return result;
}

function convertMarkdownToJson(markdown) {
  const tokens = md.parse(markdown, {});
  const result = [];
  let listStack = [];

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === 'heading_open') {
      const level = token.tag;
      const inline = tokens[i + 1];
      const content = parseInline(inline.children);
      result.push({ type: level, content });
      i += 3; // heading_open, inline, heading_close
      continue;
    }

    if (token.type === 'paragraph_open') {
      const inline = tokens[i + 1];
      const content = parseInline(inline.children);
      result.push({ type: 'p', content });
      i += 3; // paragraph_open, inline, paragraph_close
      continue;
    }

    if (token.type === 'bullet_list_open') {
      listStack.push({ type: 'ul', items: [] });
      i++;
      continue;
    }

    if (token.type === 'ordered_list_open') {
      listStack.push({ type: 'ol', items: [] });
      i++;
      continue;
    }

    if (token.type === 'list_item_open') {
      const inline = tokens[i + 2]; // skip list_item_open -> paragraph_open -> inline
      const content = parseInline(inline.children);
      listStack[listStack.length - 1].items.push(content);
      i += 4; // list_item_open, paragraph_open, inline, paragraph_close, list_item_close
      continue;
    }

    if (token.type === 'bullet_list_close' || token.type === 'ordered_list_close') {
      const list = listStack.pop();
      result.push(list);
      i++;
      continue;
    }

    i++;
  }

  return result;
}

module.exports = { convertMarkdownToJson };
