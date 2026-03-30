"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { runDeleteDecision } from "@/src/composition/decision/run-delete-decision";

type DeleteDecisionButtonProps = {
  decisionId: string;
};

export function DeleteDecisionButton({
  decisionId,
}: DeleteDecisionButtonProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const ok = window.confirm("この意思決定ノートを削除しますか？");
    if (!ok) return;

    setSubmitting(true);
    setError(null);

    const result = await runDeleteDecision(decisionId);

    if (!result.success) {
      setError(
        result.error.type === "validation"
          ? result.error.issues[0]?.message ?? "入力内容を確認してください。"
          : result.error.message
      );
      setSubmitting(false);
      return;
    }

    router.push("/decisions");
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-xl border border-red-300 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "削除中..." : "削除する"}
      </button>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
