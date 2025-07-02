export type Functions<T> = Partial<{
  [K in keyof T]: T[K];
}>;
