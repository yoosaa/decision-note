import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";

type EvaluationAxesEditorProps = {
  draft: DecisionDraft;
  onChange: (next: DecisionDraft) => void;
};

export function EvaluationAxesEditor({
  draft,
  onChange,
}: EvaluationAxesEditorProps) {
  function updateAxisName(axisId: string, name: string) {
    onChange({
      ...draft,
      evaluationAxes: draft.evaluationAxes.map((axis) =>
        axis.id === axisId ? { ...axis, name } : axis
      ),
    });
  }

  function addAxis() {
    if (draft.evaluationAxes.length >= 3) return;

    const newAxisId = crypto.randomUUID();

    onChange({
      ...draft,
      evaluationAxes: [
        ...draft.evaluationAxes,
        {
          id: newAxisId,
          name: `評価軸${draft.evaluationAxes.length + 1}`,
        },
      ],
      options: draft.options.map((option) => ({
        ...option,
        scores: [
          ...option.scores,
          {
            axisId: newAxisId,
            value: 3,
          },
        ],
      })),
    });
  }

  function removeAxis(axisId: string) {
    if (draft.evaluationAxes.length <= 1) return;

    onChange({
      ...draft,
      evaluationAxes: draft.evaluationAxes.filter((axis) => axis.id !== axisId),
      options: draft.options.map((option) => ({
        ...option,
        scores: option.scores.filter((score) => score.axisId !== axisId),
      })),
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">評価軸</h2>
        <button
          type="button"
          onClick={addAxis}
          disabled={draft.evaluationAxes.length >= 3}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:opacity-50"
        >
          軸を追加
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {draft.evaluationAxes.map((axis, index) => (
          <div key={axis.id} className="flex items-center gap-3">
            <input
              value={axis.name}
              onChange={(e) => updateAxisName(axis.id, e.target.value)}
              placeholder={`評価軸${index + 1}`}
              className="flex-1 rounded-xl text-slate-600 placeholder:text-slate-400 border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
            />

            <button
              type="button"
              onClick={() => removeAxis(axis.id)}
              disabled={draft.evaluationAxes.length <= 1}
              className="rounded-xl border border-red-300 px-3 py-2 text-sm text-red-700 disabled:opacity-50"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
