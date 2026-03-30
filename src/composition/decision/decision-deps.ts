import { LocalStorageDecisionRepository } from "@/src/infrastructure/decision/repositories/local-storage-decision-repository";

function createId(): string {
  return crypto.randomUUID();
}

function getNow(): string {
  return new Date().toISOString();
}

const decisionRepository = new LocalStorageDecisionRepository();

export function getDecisionDeps() {
  return {
    decisionRepository,
    createId,
    getNow,
  };
}
