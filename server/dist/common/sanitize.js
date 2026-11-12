"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractText = exports.sanitizeSite = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const address_1 = require("./address");
const ALLOWED_TAGS = [
    'a', 'article', 'aside', 'b', 'blockquote', 'br', 'code', 'div', 'em',
    'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'header', 'hr', 'i', 'li', 'main', 'mark', 'nav', 'ol', 'p', 'pre',
    'section', 'small', 'span', 'strong', 'style', 'sub', 'sup', 'table',
    'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul',
];
const options = {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { '*': ['class', 'style'], a: ['href'] },
    allowVulnerableTags: true,
    transformTags: {
        a: (tagName, attribs) => {
            const href = (attribs.href ?? '').trim().toLowerCase();
            const safeAttribs = address_1.ADDRESS_PATTERN.test(href) ? { href } : {};
            return { tagName, attribs: safeAttribs };
        },
    },
};
const ENTITIES = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
};
const sanitizeSite = (html) => (0, sanitize_html_1.default)(html, options);
exports.sanitizeSite = sanitizeSite;
const extractText = (html) => (0, sanitize_html_1.default)(html, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (text) => `${text} `,
})
    .replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity])
    .replace(/\s+/g, ' ')
    .trim();
exports.extractText = extractText;
//# sourceMappingURL=sanitize.js.map