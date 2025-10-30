type ObjectWithNullValues<T extends object> = {
  [K in keyof T]?: string;
};

export const copyObjectWithNullValues = <T extends object>(
  originalObject: T
) => {
  return Object.keys(originalObject).reduce(
    (acc: { [index: string]: undefined }, key) => {
      acc[key] = undefined;
      return acc;
    },
    {}
  ) as ObjectWithNullValues<T>;
};
