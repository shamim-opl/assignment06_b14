"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true for a brief moment whenever `value` changes, so a UI element
 * (like a navbar counter) can play a little "pop" animation on updates.
 *
 * Pass `enabled: false` while a value is still loading (e.g. before
 * localStorage has hydrated) so the very first "real" value doesn't play
 * the bump animation — only genuine changes after that do.
 */
export function useBump(value, { enabled = true } = {}) {
  const [bumping, setBumping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (!enabled) {
      prev.current = value;
      return;
    }
    if (prev.current === value) return;
    prev.current = value;
    setBumping(true);
    const timeout = setTimeout(() => setBumping(false), 350);
    return () => clearTimeout(timeout);
  }, [value, enabled]);

  return bumping;
}
