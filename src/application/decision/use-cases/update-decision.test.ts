import { describe, expect, it, vi } from "vitest";
import { updateDecision } from "./update-decision";
import type { Decision } from "@/src/domain/decision/model/decision";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import type { DecisionRepository } from "../ports/decision-repository";

function createCurrentDecision(): Decision {
  return {
    id: "decision-1",
    title: "住む場所を比較する",
    description: "通勤と家賃を比較したい",
    note: "落ち着ける場所がいい",
    createdAt: "2026-03-30T00:00:00.000Z",
    updatedAt: "2026-03-30T00:00:00.000Z",
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

function createValidDraft(): DecisionDraft {
  return {
    title: "住む場所を比較し直す",
    description: "通勤と家賃に加えて住みやすさも考えたい",
    note: "駅距離も考慮したい",
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
          { axisId: "axis-1", value: 4 },
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

function createRepositoryMock(current: Decision | null): DecisionRepository {
  return {
    save: vi.fn().mockResolvedValue(undefined),
    findById: vi.fn().mockResolvedValue(current),
    findAll: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(undefined),
  };
}

describe("updateDecision", () => {
  it("妥当な draft なら更新して success を返す", async () => {
    const repository = createRepositoryMock(createCurrentDecision());

    const result = await updateDecision("decision-1", createValidDraft(), {
      decisionRepository: repository,
      getNow: () => "2026-03-31T00:00:00.000Z",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe("decision-1");
      expect(result.data.title).toBe("住む場所を比較し直す");
      expect(result.data.updatedAt).toBe("2026-03-31T00:00:00.000Z");
    }

    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it("不正な draft なら validation error を返す", async () => {
    const repository = createRepositoryMock(createCurrentDecision());

    const result = await updateDecision(
      "decision-1",
      {
        ...createValidDraft(),
        title: "   ",
      },
      {
        decisionRepository: repository,
        getNow: () => "2026-03-31T00:00:00.000Z",
      }
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.type).toBe("validation");
    }

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("対象が存在しない場合は not_found を返す", async () => {
    const repository = createRepositoryMock(null);

    const result = await updateDecision("missing-id", createValidDraft(), {
      decisionRepository: repository,
      getNow: () => "2026-03-31T00:00:00.000Z",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.type).toBe("not_found");
    }

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("保存時に例外が起きたら unexpected error を返す", async () => {
    const repository: DecisionRepository = {
      save: vi.fn().mockRejectedValue(new Error("save failed")),
      findById: vi.fn().mockResolvedValue(createCurrentDecision()),
      findAll: vi.fn().mockResolvedValue([]),
      delete: vi.fn().mockResolvedValue(undefined),
    };

    const result = await updateDecision("decision-1", createValidDraft(), {
      decisionRepository: repository,
      getNow: () => "2026-03-31T00:00:00.000Z",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.type).toBe("unexpected");
    }
  });
});
