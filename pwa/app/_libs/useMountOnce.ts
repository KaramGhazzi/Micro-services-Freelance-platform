import { EffectCallback, useEffect, useRef } from 'react';

/*
 * Triggers once even while in strict debug mode
 */
export default function useMountOnce(f: EffectCallback) {
  const debounce = useRef(false);

  useEffect(() => {
    if (debounce.current) return;
    debounce.current = true;

    return f();
  }, []);
}
