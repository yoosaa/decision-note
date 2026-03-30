"use client";

import { useEffect, useState } from "react";
import { runListDecisions } from "@/src/composition/decision/run-list-decisions";
import { DecisionCard } from "@/src/presentation/src/entities/decision/";

type DecisionListItem = {
  id: string;
  title: string;
  description: string;
  optionCount: number;
  updatedAt: string;
};

export function DecisionList() {
  const [items, setItems] = useState<DecisionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await runListDecisions();

      if (!active) return;

      if (!result.success) {
        setError(
          result.error.type === "unexpected"
            ? result.error.message
            : "一覧の取得に失敗しました。"
        );
        setLoading(false);
        return;
      }

      setItems(result.data);
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
        読み込み中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <p className="text-sm text-slate-600">
          まだ意思決定ノートはありません。
        </p>
        <p className="mt-2 text-xs text-slate-500">
          「新しく作成」から最初の比較メモを作れます。
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <DecisionCard key={item.id} item={item} />
      ))}
    </div>
  );
}
