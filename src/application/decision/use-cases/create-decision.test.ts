import { describe, expect, it, vi } from "vitest";
import { createDecision } from "./create-decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import type { DecisionRepository } from "../ports/decision-repository";

function createValidDraft(): DecisionDraft {
  return {
    title: "住む場所を比較する",
    description: "通勤と家賃を比較したい",
    note: "落ち着いて住める場所がよい",
    evaluationAxes: [
      { id: "axis-1", name: "通勤しやすさ" },
      { id: "axis-2", name: "家賃" },
    ],
    options: [
      {
        id: "option-1",
        name: "A駅周辺",
        pros: ["通勤が楽"],
        cons: ["家賃が高い"],
        scores: [
          { axisId: "axis-1", value: 5 },
          { axisId: "axis-2", value: 2 },
        ],
      },
      {
        id: "option-2",
        name: "B駅周辺",
        pros: ["家賃が安い"],
        cons: ["少し遠い"],
        scores: [
          { axisId: "axis-1", value: 3 },
          { axisId: "axis-2", value: 5 },
        ],
      },
    ],
  };
}

function createRepositoryMock(): DecisionRepository {
  return {
    save: vi.fn().mockResolvedValue(undefined),
    findById: vi.fn().mockResolvedValue(null),
    findAll: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(undefined),
  };
}

describe("createDecision", () => {
  it("妥当な draft なら保存して success を返す", async () => {
    const draft = createValidDraft();
    const repository = createRepositoryMock();

    const result = await createDecision(draft, {
      decisionRepository: repository,
      createId: () => "decision-1",
      getNow: () => "2026-03-30T00:00:00.000Z",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe("decision-1");
      expect(result.data.title).toBe("住む場所を比較する");
    }

    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it("不正な draft なら validation error を返し保存しない", async () => {
    const repository = createRepositoryMock();

    const result = await createDecision(
      {
        ...createValidDraft(),
        title: "   ",
      },
      {
        decisionRepository: repository,
        createId: () => "decision-1",
        getNow: () => "2026-03-30T00:00:00.000Z",
      }
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.type).toBe("validation");
    }

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("repository 保存で例外が起きたら unexpected error を返す", async () => {
    const repository: DecisionRepository = {
      save: vi.fn().mockRejectedValue(new Error("save failed")),
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn().mockResolvedValue([]),
      delete: vi.fn().mockResolvedValue(undefined),
    };

    const result = await createDecision(createValidDraft(), {
      decisionRepository: repository,
      createId: () => "decision-1",
      getNow: () => "2026-03-30T00:00:00.000Z",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.type).toBe("unexpected");
    }
  });
});
