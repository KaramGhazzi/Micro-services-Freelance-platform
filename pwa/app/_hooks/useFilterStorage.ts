import { useEffect, useState } from 'react';

/**
 * Alters an object type so optional fields may still be undefined, but must be set so explicitly.
 *
 * So type `{a?: number}` becomes `{a: number | undefined}`
 */
type ExplicitOptional<T extends object> = {
  [K in keyof Required<T>]: T extends Record<K, T[K]> ? T[K] : T[K] | undefined;
};

/**
 * Creates functions to interact with the session storage in a systematic way.
 * @param base A base key so fields with the same name of different pages/systems won't interfere.
 * @param defaults All fields with their default value. If a fields value is ever set to it's default it will be removed from storage instead
 * @returns an Object with all functions to interact with storage
 */
export const useFilterStorage = <T extends {}>(
  base: string,
  defaults: ExplicitOptional<T>
) => {
  type A = Extract<keyof T, string>;

  /**
   * Gets a value from storage, if it's not set it takes the default instead, or if `defaultOverwrite` is set it takes that value instead.
   * @param key The key of the field.
   * @param defaultOverwrite An overwrite of what value to return if none is found in storage. Does not alter the behavior of removing values from storage if their value is equal to it's normal default
   * @returns The value of the field.
   */
  const get = <K extends A>(key: K, defaultOverwrite: T[K] | null = null) => {
    if (typeof window === 'undefined') return defaultOverwrite ?? defaults[key];

    const found = sessionStorage.getItem(`${base}:${key}`);

    if (found === null) return defaultOverwrite ?? defaults[key];

    return JSON.parse(found) as T[K];
  };

  /**
   * Sets a value to storage. Will remove the value from storage instead if the value is equal to the default
   * @param key The key of the field.
   * @param value The new value of the field.
   */
  const set = <K extends A>(key: K, value: T[K]) => {
    if (typeof window === 'undefined') return;

    // Objects and arrays will never be removed this way since they are never equal by reference. I consider this an acceptable bug
    if (
      value === defaults[key] ||
      value === undefined ||
      (typeof value == 'number' && isNaN(value)) ||
      (Array.isArray(defaults[key]) &&
        Array.isArray(value) &&
        defaults[key].length == 0 &&
        value.length == 0)
    ) {
      sessionStorage.removeItem(`${base}:${key}`);
    } else {
      sessionStorage.setItem(`${base}:${key}`, JSON.stringify(value));
    }
  };

  /**
   * Removes a value from storage.
   * @param key The keyof the field.
   */
  const remove = <K extends A>(key: K) => {
    if (typeof window === 'undefined') return;

    sessionStorage.removeItem(`${base}:${key}`);
  };

  return {
    get,
    set,
    remove,

    /**
     * Gets the values of all fields defined in the filter storage.
     * @param overwrittenDefaults An object with any overwritten defaults
     * @returns An object with a received values
     */
    getAll: (overwrittenDefaults: Partial<T> = {}) => {
      let obj: Partial<T> = {};

      for (const key of Object.keys(defaults) as A[]) {
        get(key, overwrittenDefaults[key] ?? null);
      }

      return obj as T;
    },

    /**
     * Sets multiple values to store at once.
     * @param values An object with corresponding key/value pairs to set.
     */
    setMany: (values: Partial<T>) => {
      for (const [key, value] of Object.entries(values)) {
        set(key as A, value as T[A]);
      }
    },

    /**
     * If param has a 'correct' value then stores that value and returns it, otherwise get the value from storage. This is useful when there is a initial primary source of a value where the storage is a fallback.
     *
     * 'correct' values are all values but `null`, `undefined` and `NaN`
     * @param key
     * @param param
     * @returns
     */
    setOrGet<K extends A>(key: K, param: T[K] | null | undefined) {
      if (param != null && !Number.isNaN(param)) {
        set(key, param);
        return param;
      } else {
        return get(key);
      }
    },

    base,
  };
};

/**
 * A state that stores and loads it's state using a filterStorage.
 * @param base The base used by the filterStorage, can also use an existing filterStorage to match it's base
 * @param defaults An object with the default state of all fields of the storage. These should generally be constant.
 * @param initial An object with the initial state of any field that is not in storage, where the field should not be initially set to it's default.
 * @returns
 */
export const useFilterStorageAsState = <T extends {}>(
  base: string | { base: string },
  defaults: ExplicitOptional<T>,
  initial?: Partial<T> | (() => Partial<T>)
) => {
  type A = Extract<keyof T, string>;

  const filterStorage = useFilterStorage(
    typeof base == 'string' ? base : base.base,
    defaults
  );

  const [state, setState] = useState(() => {
    const initialState: Partial<T> =
      initial === undefined
        ? {}
        : typeof initial == 'function'
        ? initial()
        : initial;

    const state: Partial<T> = {};
    for (const key of Object.keys(defaults) as A[]) {
      state[key] = filterStorage.get(key, initialState[key]);
    }

    return state as T;
  });

  useEffect(() => {
    filterStorage.setMany(state);
  }, [state]);

  const resetState = () => {
    const initialState: Partial<T> =
      initial === undefined
        ? {}
        : typeof initial == 'function'
        ? initial()
        : initial;

    const state: Partial<T> = {};
    for (const key of Object.keys(defaults) as A[]) {
      state[key] = initialState[key] ?? defaults[key];
    }

    setState(state as T);

    return state as T;
  };

  return [state, setState, resetState] as [T, typeof setState, () => T];
};
