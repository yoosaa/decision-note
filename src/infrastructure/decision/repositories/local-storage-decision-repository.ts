import type {
  Decision,
  DecisionId,
} from "@/src/domain/decision/model/decision";
import type { DecisionRepository } from "@/src/application/decision/ports/decision-repository";
import {
  toDecisionDomain,
  toDecisionStorageRecord,
} from "../mappers/decision-storage-mapper";
import {
  readDecisionStorage,
  writeDecisionStorage,
} from "../lib/decision-storage-driver";

export class LocalStorageDecisionRepository implements DecisionRepository {
  async save(decision: Decision): Promise<void> {
    const data = readDecisionStorage();
    const record = toDecisionStorageRecord(decision);

    const existingIndex = data.decisions.findIndex(
      (item) => item.id === decision.id
    );

    if (existingIndex === -1) {
      data.decisions.push(record);
    } else {
      data.decisions[existingIndex] = record;
    }

    writeDecisionStorage(data);
  }

  async findById(id: DecisionId): Promise<Decision | null> {
    const data = readDecisionStorage();
    const record = data.decisions.find((item) => item.id === id);

    if (!record) {
      return null;
    }

    return toDecisionDomain(record);
  }

  async findAll(): Promise<Decision[]> {
    const data = readDecisionStorage();

    return data.decisions.map(toDecisionDomain);
  }

  async delete(id: DecisionId): Promise<void> {
    const data = readDecisionStorage();

    const next = data.decisions.filter((item) => item.id !== id);

    writeDecisionStorage({
      ...data,
      decisions: next,
    });
  }
}
