import sanitizeHtml from 'sanitize-html';
import { ADDRESS_PATTERN } from './address';

const ALLOWED_TAGS = [
  'a', 'article', 'aside', 'b', 'blockquote', 'br', 'code', 'div', 'em',
  'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'hr', 'i', 'li', 'main', 'mark', 'nav', 'ol', 'p', 'pre',
  'section', 'small', 'span', 'strong', 'style', 'sub', 'sup', 'table',
  'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul',
];

const options: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: { '*': ['class', 'style'], a: ['href'] },
  allowVulnerableTags: true,
  transformTags: {
    a: (tagName, attribs) => {
      const href = (attribs.href ?? '').trim().toLowerCase();
      const safeAttribs = ADDRESS_PATTERN.test(href) ? { href } : {};
      return { tagName, attribs: safeAttribs } as any;
    },
  },
};

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

export const sanitizeSite = (html: string): string => sanitizeHtml(html, options);

export const extractText = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (text) => `${text} `,
  })
    .replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity])
    .replace(/\s+/g, ' ')
    .trim();