export const stringFilter = (
  value: string,
  extraCondition: boolean = true,
  filter?: any
) => {
  if (value && extraCondition) {
    return filter ?? { contains: value };
  } else {
    return;
  }
};

export const enumFilter = (
  value: string,
  extraCondition: boolean = true,
  filter?: any
) => {
  if (value && extraCondition) {
    return filter ?? { equals: value };
  } else {
    return;
  }
};

export const numberFilter = (
  value: string,
  extraCondition: boolean = true,
  filter?: any
) => {
  if (value && !Number.isNaN(+value) && extraCondition) {
    return filter ?? { equals: +value };
  } else {
    return;
  }
};

export const listFilter = (
  value: any[],
  extraCondition: boolean = true,
  filter?: any
) => {
  if (value && value.length && extraCondition) {
    return filter ?? { in: value };
  } else {
    return;
  }
};

export const orFilter = (
  fields: string[],
  filters: any[],
  extraCondition: boolean = true
) => {
  const combined = filters
    .map((filter, i) => [filter, fields[i]] as [any, string])
    .filter(([filter, _field]) => filter);

  if (combined.length && extraCondition) {
    return combined.map(([filter, field]) => ({
      [field]: filter,
    }));
  } else {
    return;
  }
};
