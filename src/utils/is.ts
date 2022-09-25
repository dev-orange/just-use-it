export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const isFunction = (value: any): value is Function => typeof value === 'function';
