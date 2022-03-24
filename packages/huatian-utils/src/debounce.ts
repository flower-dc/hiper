type Fn = (...args: any[]) => any;

export const debounce = <T extends Fn>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let t: number, res: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => {
      res = fn(...args);
    }, delay);
    return res;
  };
};
