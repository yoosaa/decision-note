"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DecisionDraft } from "@/src/domain/decision/model/decision-draft";
import { runCreateDecision } from "@/src/composition/decision/run-create-decision";
import { runUpdateDecision } from "@/src/composition/decision/run-update-decision";
import { DecisionMetaForm } from "@/src/presentation/src/features/edit-decision-meta";
import { DecisionOptionsEditor } from "@/src/presentation/src/features/edit-decision-options";
import { EvaluationAxesEditor } from "@/src/presentation/src/features/edit-evaluation-axes";
import { DecisionComparison } from "@/src/presentation/src/widgets/decision-comparison";
import { createEmptyDecisionDraft } from "../model/create-empty-decision-draft";
import { useDecisionEditorMachine } from "../model/use-decision-editor-machine";
import { toDecisionComparisonDto } from "@/src/application/decision/presenters/to-decision-comparison-dto";

type DecisionEditorProps =
  | {
      mode: "create";
      initialDraft?: DecisionDraft;
    }
  | {
      mode: "edit";
      decisionId: string;
      initialDraft: DecisionDraft;
    };

export function DecisionEditor(props: DecisionEditorProps) {
  const [draft, setDraft] = useState<DecisionDraft>(() => {
    if (props.initialDraft) {
      return props.initialDraft;
    }
    return createEmptyDecisionDraft();
  });

  const { state, actions } = useDecisionEditorMachine(
    props.mode === "edit" ? props.decisionId : null
  );

  const previewComparison = useMemo(() => {
    const previewDecision = {
      id: "preview",
      title: draft.title,
      description: draft.description,
      note: draft.note,
      createdAt: "",
      updatedAt: "",
      evaluationAxes: draft.evaluationAxes,
      options: draft.options.map((option) => ({
        id: option.id,
        name: option.name || "未入力の選択肢",
        pros: option.pros.filter(Boolean),
        cons: option.cons.filter(Boolean),
        scores: option.scores,
      })),
    };

    return toDecisionComparisonDto(previewDecision);
  }, [draft]);

  async function handleSubmit() {
    actions.submit();

    const result =
      props.mode === "create"
        ? await runCreateDecision(draft)
        : await runUpdateDecision(props.decisionId, draft);

    if (!result.success) {
      if (result.error.type === "validation") {
        actions.validationError(result.error.issues);
      } else {
        actions.unexpectedError(result.error.message);
      }
      return;
    }

    actions.success(
      result.data.id,
      props.mode === "create" ? "保存しました。" : "更新しました。"
    );
  }

  const title =
    props.mode === "create" ? "新しい意思決定ノート" : "意思決定ノートを編集";
  const description =
    props.mode === "create"
      ? "入力しながら右側で比較結果を確認できます。"
      : "保存済みの内容を見直しながら更新できます。";
  const submitLabel =
    props.mode === "create"
      ? state.status === "submitting"
        ? "保存中..."
        : "保存する"
      : state.status === "submitting"
      ? "更新中..."
      : "更新する";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/decisions"
            className="text-sm text-slate-600 transition hover:text-slate-900"
          >
            ← 一覧へ戻る
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">decision-note</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        {state.issues.length > 0 ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-800">
              入力内容を確認してください。
            </p>
            <ul className="mt-2 space-y-1 text-sm text-amber-700">
              {state.issues.map((issue, index) => (
                <li key={`${issue.field}-${index}`}>- {issue.message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {state.unexpectedError ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {state.unexpectedError}
          </div>
        ) : null}

        {state.savedId && state.savedMessage ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-800">
              {state.savedMessage}
            </p>
            <div className="mt-2 flex gap-3 text-sm">
              <Link
                href={`/decisions/${state.savedId}`}
                className="text-emerald-700 underline"
              >
                詳細を見る
              </Link>

              {props.mode === "create" ? (
                <button
                  type="button"
                  onClick={() => {
                    setDraft(createEmptyDecisionDraft());
                    actions.resetFeedback();
                  }}
                  className="text-emerald-700 underline"
                >
                  もう1件作る
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <DecisionMetaForm
              draft={draft}
              onChange={(next) => {
                setDraft(next);
                if (
                  state.issues.length > 0 ||
                  state.unexpectedError ||
                  state.savedMessage
                ) {
                  actions.resetFeedback();
                }
              }}
            />
            <EvaluationAxesEditor
              draft={draft}
              onChange={(next) => {
                setDraft(next);
                if (
                  state.issues.length > 0 ||
                  state.unexpectedError ||
                  state.savedMessage
                ) {
                  actions.resetFeedback();
                }
              }}
            />
            <DecisionOptionsEditor
              draft={draft}
              onChange={(next) => {
                setDraft(next);
                if (
                  state.issues.length > 0 ||
                  state.unexpectedError ||
                  state.savedMessage
                ) {
                  actions.resetFeedback();
                }
              }}
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={state.status === "submitting"}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {submitLabel}
              </button>
            </div>
          </div>

          <div className="xl:sticky xl:top-6 xl:self-start">
            <DecisionComparison comparison={previewComparison} />
          </div>
        </div>
      </div>
    </main>
  );
}
