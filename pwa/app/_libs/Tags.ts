export const encodeTags = (tags: string[] | string | undefined | null) => {
  if (tags == null) return null;

  if (typeof tags == 'string') return tags;

  if (!Array.isArray(tags))
    throw TypeError(`Can't encode type ${typeof tags} as tags`);

  if (tags.length == 0) return null;

  return JSON.stringify(tags);
};

export const parseTags = (tags: string | string[] | undefined | null) => {
  if (Array.isArray(tags)) return tags;

  if (tags == null) return [];

  if (typeof tags != 'string')
    TypeError(`Can't parse type ${typeof tags} as tags`);

  try {
    return JSON.parse(tags);
  } catch {
    return tags.split(',');
  }
};
