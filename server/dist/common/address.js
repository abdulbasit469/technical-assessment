"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDRESS_PATTERN = void 0;
exports.normaliseAddress = normaliseAddress;
exports.ADDRESS_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*\.zz$/;
function normaliseAddress(raw) {
    return raw
        .trim()
        .toLowerCase()
        .replace(/^[a-z]+:\/\//, '')
        .replace(/\/+$/, '');
}
//# sourceMappingURL=address.js.map