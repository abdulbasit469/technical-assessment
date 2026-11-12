export const ADDRESS_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*\.zz$/;

export function normaliseAddress(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^[a-z]+:\/\//, '')
    .replace(/\/+$/, '');
}