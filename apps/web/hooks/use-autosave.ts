import { useEffect, useRef, useCallback, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface AutosaveOptions<T> {
  /** The current form data to save */
  data: T;
  /** Async function that performs the save to the backend. Must return a Promise. */
  saveFn: (data: T) => Promise<unknown>;
  /** Debounce delay in ms before calling saveFn. Default: 3000 */
  debounceMs?: number;
  /** Whether autosave is enabled at all */
  enabled?: boolean;
  /**
   * Optional localStorage key.
   * When provided, the hook will:
   *  - Write data to localStorage on every change (immediately, no debounce).
   *  - Read and return the stored draft on first render via `restoredDraft`.
   *  - Expose `clearDraft()` to wipe the stored value.
   */
  storageKey?: string;
}

export interface AutosaveResult<T> {
  /** Current save status (reflects backend save via saveFn) */
  status: SaveStatus;
  /** Timestamp of the last successful backend save */
  lastSavedAt: Date | null;
  /** Trigger a backend save immediately, bypassing the debounce */
  saveNow: () => Promise<void>;
  /**
   * The draft data read from localStorage on mount.
   * `null` if no storageKey was given, or nothing was stored yet.
   */
  restoredDraft: T | null;
  /** Remove the draft from localStorage */
  clearDraft: () => void;
}

// ─── localStorage helpers ────────────────────────────────────────────────────

function readFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("[useAutosave] Could not write to localStorage:", err);
  }
}

function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAutosave<T>({
  data,
  saveFn,
  debounceMs = 3000,
  enabled = true,
  storageKey,
}: AutosaveOptions<T>): AutosaveResult<T> {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // restoredDraft starts null; populated client-side in useEffect below.
  // Using useState initializer would run on the server (SSR) where localStorage
  // is undefined, causing the read to always return null and the draft to never restore.
  const [restoredDraft, setRestoredDraft] = useState<T | null>(null);

  // ── Read draft from localStorage (client-only, runs once on mount) ─────────
  useEffect(() => {
    if (!storageKey) return;
    const draft = readFromStorage<T>(storageKey);
    if (draft !== null) setRestoredDraft(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty: read once on mount

  // Refs so callbacks always see the latest values without re-renders
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef(false);
  const latestDataRef = useRef<T>(data);
  const lastSavedDataRef = useRef<string>("");
  const saveFnRef = useRef(saveFn);

  // Keep refs in sync with latest props
  latestDataRef.current = data;
  saveFnRef.current = saveFn;

  // ── localStorage: write immediately on every data change ──────────────────
  useEffect(() => {
    if (!storageKey || !enabled) return;
    writeToStorage(storageKey, data);
  }, [data, storageKey, enabled]);

  // ── clearDraft ────────────────────────────────────────────────────────────
  const clearDraft = useCallback(() => {
    if (storageKey) removeFromStorage(storageKey);
  }, [storageKey]);

  // ── Debounce helpers ──────────────────────────────────────────────────────
  const cancelDebounce = useCallback(() => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  // ── Backend save ──────────────────────────────────────────────────────────
  const executeSave = useCallback(async (): Promise<void> => {
    if (isSavingRef.current) return;

    const currentDataStr = JSON.stringify(latestDataRef.current);
    // Skip if nothing changed since last successful backend save
    if (currentDataStr === lastSavedDataRef.current) return;

    isSavingRef.current = true;
    setStatus("saving");

    try {
      await saveFnRef.current(latestDataRef.current);
      lastSavedDataRef.current = currentDataStr;
      setLastSavedAt(new Date());
      setStatus("saved");
    } catch (err) {
      console.error("[useAutosave] Backend save failed:", err);
      setStatus("error");
    } finally {
      isSavingRef.current = false;
    }
  }, []);

  // Public method: save immediately to backend, cancelling any pending debounce
  const saveNow = useCallback(async (): Promise<void> => {
    cancelDebounce();
    await executeSave();
  }, [cancelDebounce, executeSave]);

  // ── Debounced backend autosave ────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    cancelDebounce();

    debounceTimerRef.current = setTimeout(() => {
      void executeSave();
    }, debounceMs);

    return cancelDebounce;
  }, [data, enabled, debounceMs, cancelDebounce, executeSave]);

  // ── Save on tab switch / page close ──────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cancelDebounce();
        void executeSave();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const currentDataStr = JSON.stringify(latestDataRef.current);
      const hasUnsavedChanges = currentDataStr !== lastSavedDataRef.current;

      if (hasUnsavedChanges) {
        void executeSave();
        // Show native "Leave page?" dialog
        e.preventDefault();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, cancelDebounce, executeSave]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      cancelDebounce();
    };
  }, [cancelDebounce]);

  return { status, lastSavedAt, saveNow, restoredDraft, clearDraft };
}
