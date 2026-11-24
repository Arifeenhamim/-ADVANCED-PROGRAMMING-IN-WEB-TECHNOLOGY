export {};

declare global {
  function nameof<T>(nameFn: () => T): string;
}

const _global = global as any;
_global.nameof = function <T>(nameFn: () => T) {
  return /return (.*);/.exec(nameFn.toString())?.[1] ?? "";
};
