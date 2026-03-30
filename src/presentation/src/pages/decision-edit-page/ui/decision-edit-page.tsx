"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import { runGetDecisionDraft } from "@/src/composition/decision/run-get-decision-draft";
import { DecisionEditor } from "@/src/presentation/src/widgets/decision-editor";

type DecisionEditPageProps = {
  decisionId: string;
};

export function DecisionEditPage({ decisionId }: DecisionEditPageProps) {
  const [draft, setDraft] = useState<DecisionDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await runGetDecisionDraft(decisionId);

      if (!active) return;

      if (!result.success) {
        setError(
          result.error.type === "validation"
            ? result.error.issues[0]?.message ?? "入力内容を確認してください。"
            : result.error.message
        );
        setLoading(false);
        return;
      }

      setDraft(result.data.draft);
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, [decisionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
            読み込み中...
          </div>
        </div>
      </main>
    );
  }

  if (error || !draft) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link
            href="/decisions"
            className="mb-6 inline-block text-sm text-slate-600 transition hover:text-slate-900"
          >
            ← 一覧へ戻る
          </Link>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
            {error || "編集対象のデータを読み込めませんでした。"}
          </div>
        </div>
      </main>
    );
  }

  return (
    <DecisionEditor mode="edit" decisionId={decisionId} initialDraft={draft} />
  );
}
