import type {
  Decision,
  DecisionId,
} from "@/src/domain/decision/model/decision";

export interface DecisionRepository {
  save(decision: Decision): Promise<void>;
  findById(id: DecisionId): Promise<Decision | null>;
  findAll(): Promise<Decision[]>;
  delete(id: DecisionId): Promise<void>;
}
