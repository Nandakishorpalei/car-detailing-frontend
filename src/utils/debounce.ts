export function debounce<T extends (...arg: any) => any>(
  func: T,
  timeout = 500
) {
  let timer: NodeJS.Timeout | undefined;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore // Couldn't specify type for `this`
      func.apply(this, args);
    }, timeout);
  }) as T;
}
