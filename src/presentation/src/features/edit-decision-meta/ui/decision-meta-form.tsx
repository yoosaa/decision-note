import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";

type DecisionMetaFormProps = {
  draft: DecisionDraft;
  onChange: (next: DecisionDraft) => void;
};

export function DecisionMetaForm({ draft, onChange }: DecisionMetaFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">基本情報</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            テーマ
          </label>
          <input
            value={draft.title}
            onChange={(e) =>
              onChange({
                ...draft,
                title: e.target.value,
              })
            }
            placeholder="何について迷っているか"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            説明
          </label>
          <textarea
            value={draft.description}
            onChange={(e) =>
              onChange({
                ...draft,
                description: e.target.value,
              })
            }
            placeholder="比較したい背景や状況"
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            最終メモ
          </label>
          <textarea
            value={draft.note}
            onChange={(e) =>
              onChange({
                ...draft,
                note: e.target.value,
              })
            }
            placeholder="最後に残したい考えや判断メモ"
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
          />
        </div>
      </div>
    </section>
  );
}
