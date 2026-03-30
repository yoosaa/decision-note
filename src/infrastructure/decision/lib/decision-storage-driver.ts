import { DECISION_STORAGE_KEY } from "../constants/storage-keys";
import type { DecisionStorageData } from "../storage/decision-storage";

const EMPTY_DATA: DecisionStorageData = {
  version: 1,
  decisions: [],
};

export function readDecisionStorage(): DecisionStorageData {
  if (typeof window === "undefined") {
    return EMPTY_DATA;
  }

  const raw = window.localStorage.getItem(DECISION_STORAGE_KEY);

  if (!raw) {
    return EMPTY_DATA;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DecisionStorageData>;

    if (parsed.version !== 1 || !Array.isArray(parsed.decisions)) {
      return EMPTY_DATA;
    }

    return {
      version: 1,
      decisions: parsed.decisions,
    };
  } catch {
    return EMPTY_DATA;
  }
}

export function writeDecisionStorage(data: DecisionStorageData): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DECISION_STORAGE_KEY, JSON.stringify(data));
}
