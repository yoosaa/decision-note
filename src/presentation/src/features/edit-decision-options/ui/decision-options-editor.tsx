import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";

type DecisionOptionsEditorProps = {
  draft: DecisionDraft;
  onChange: (next: DecisionDraft) => void;
};

export function DecisionOptionsEditor({
  draft,
  onChange,
}: DecisionOptionsEditorProps) {
  function updateOption(
    optionId: string,
    updater: (
      option: DecisionDraft["options"][number]
    ) => DecisionDraft["options"][number]
  ) {
    onChange({
      ...draft,
      options: draft.options.map((option) =>
        option.id === optionId ? updater(option) : option
      ),
    });
  }

  function addOption() {
    if (draft.options.length >= 4) return;

    onChange({
      ...draft,
      options: [
        ...draft.options,
        {
          id: crypto.randomUUID(),
          name: `選択肢${draft.options.length + 1}`,
          pros: [""],
          cons: [""],
          scores: draft.evaluationAxes.map((axis) => ({
            axisId: axis.id,
            value: 3,
          })),
        },
      ],
    });
  }

  function removeOption(optionId: string) {
    if (draft.options.length <= 2) return;

    onChange({
      ...draft,
      options: draft.options.filter((option) => option.id !== optionId),
    });
  }

  function updateStringList(
    optionId: string,
    target: "pros" | "cons",
    index: number,
    value: string
  ) {
    updateOption(optionId, (option) => ({
      ...option,
      [target]: option[target].map((item, i) => (i === index ? value : item)),
    }));
  }

  function addStringListItem(optionId: string, target: "pros" | "cons") {
    updateOption(optionId, (option) => ({
      ...option,
      [target]: [...option[target], ""],
    }));
  }

  function removeStringListItem(
    optionId: string,
    target: "pros" | "cons",
    index: number
  ) {
    updateOption(optionId, (option) => ({
      ...option,
      [target]:
        option[target].length <= 1
          ? option[target]
          : option[target].filter((_, i) => i !== index),
    }));
  }

  function updateScore(optionId: string, axisId: string, value: number) {
    updateOption(optionId, (option) => ({
      ...option,
      scores: option.scores.map((score) =>
        score.axisId === axisId
          ? { ...score, value: value as 1 | 2 | 3 | 4 | 5 }
          : score
      ),
    }));
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">選択肢</h2>
        <button
          type="button"
          onClick={addOption}
          disabled={draft.options.length >= 4}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:opacity-50"
        >
          選択肢を追加
        </button>
      </div>

      <div className="mt-4 space-y-5">
        {draft.options.map((option, optionIndex) => (
          <div
            key={option.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center gap-3">
              <input
                value={option.name}
                onChange={(e) =>
                  updateOption(option.id, (current) => ({
                    ...current,
                    name: e.target.value,
                  }))
                }
                placeholder={`選択肢${optionIndex + 1}`}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
              />

              <button
                type="button"
                onClick={() => removeOption(option.id)}
                disabled={draft.options.length <= 2}
                className="rounded-xl border border-red-300 px-3 py-2 text-sm text-red-700 disabled:opacity-50"
              >
                削除
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">メリット</p>
                  <button
                    type="button"
                    onClick={() => addStringListItem(option.id, "pros")}
                    className="text-xs text-slate-600"
                  >
                    追加
                  </button>
                </div>

                <div className="space-y-2">
                  {option.pros.map((pro, index) => (
                    <div
                      key={`${option.id}-pro-${index}`}
                      className="flex gap-2"
                    >
                      <input
                        value={pro}
                        onChange={(e) =>
                          updateStringList(
                            option.id,
                            "pros",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="メリットを入力"
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeStringListItem(option.id, "pros", index)
                        }
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">
                    デメリット
                  </p>
                  <button
                    type="button"
                    onClick={() => addStringListItem(option.id, "cons")}
                    className="text-xs text-slate-600"
                  >
                    追加
                  </button>
                </div>

                <div className="space-y-2">
                  {option.cons.map((con, index) => (
                    <div
                      key={`${option.id}-con-${index}`}
                      className="flex gap-2"
                    >
                      <input
                        value={con}
                        onChange={(e) =>
                          updateStringList(
                            option.id,
                            "cons",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="デメリットを入力"
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeStringListItem(option.id, "cons", index)
                        }
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-medium text-slate-800">スコア</p>
              <div className="space-y-3">
                {draft.evaluationAxes.map((axis) => {
                  const score =
                    option.scores.find((item) => item.axisId === axis.id)
                      ?.value ?? 3;

                  return (
                    <div
                      key={`${option.id}-${axis.id}`}
                      className="grid gap-2 md:grid-cols-[140px_1fr_40px]"
                    >
                      <label className="text-sm text-slate-600">
                        {axis.name}
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={score}
                        onChange={(e) =>
                          updateScore(
                            option.id,
                            axis.id,
                            Number(e.target.value)
                          )
                        }
                      />
                      <span className="text-sm font-medium text-slate-800">
                        {score}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
