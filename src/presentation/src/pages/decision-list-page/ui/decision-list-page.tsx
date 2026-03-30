"use client";

import Link from "next/link";
import { DecisionList } from "@/src/presentation/src/widgets/decision-list/";

export function DecisionListPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">decision-note</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              意思決定ノート
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              迷っていることを選択肢ごとに整理して、
              比較しながら判断しやすくするメモアプリです。
            </p>
          </div>

          <Link
            href="/decisions/new"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            新しく作成
          </Link>
        </div>

        <DecisionList />
      </div>
    </main>
  );
}
