"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { runGetDecision } from "@/src/composition/decision/run-get-decision";
import { DeleteDecisionButton } from "@/src/presentation/src/features/delete-decision";
import { DecisionComparison } from "@/src/presentation/src/widgets/decision-comparison";
import { DecisionSummary } from "@/src/presentation/src/widgets/decision-summary";
import { toDecisionComparisonDto } from "@/src/application/decision/presenters/to-decision-comparison-dto";

type DecisionDetail = {
  id: string;
  title: string;
  description: string;
  note: string;
  evaluationAxes: {
    id: string;
    name: string;
  }[];
  options: {
    id: string;
    name: string;
    pros: string[];
    cons: string[];
    scores: {
      axisId: string;
      value: 1 | 2 | 3 | 4 | 5;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
};

type DecisionDetailPageProps = {
  decisionId: string;
};

export function DecisionDetailPage({ decisionId }: DecisionDetailPageProps) {
  const [decision, setDecision] = useState<DecisionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await runGetDecision(decisionId);

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

      setDecision(result.data);
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, [decisionId]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/decisions"
            className="text-sm text-slate-600 transition hover:text-slate-900"
          >
            ← 一覧へ戻る
          </Link>

          {decision ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/decisions/${decision.id}/edit`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                編集する
              </Link>

              <DeleteDecisionButton decisionId={decision.id} />
            </div>
          ) : null}
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
            読み込み中...
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!loading && !error && decision ? (
          <div className="space-y-6">
            <DecisionSummary decision={decision} />
            <DecisionComparison
              comparison={toDecisionComparisonDto(decision)}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}
