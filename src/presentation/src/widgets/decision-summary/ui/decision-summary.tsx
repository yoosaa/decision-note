type DecisionSummaryProps = {
  decision: {
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
    }[];
    createdAt: string;
    updatedAt: string;
  };
};

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function DecisionSummary({ decision }: DecisionSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          {decision.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {decision.description || "説明は未入力です。"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">評価軸</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {decision.evaluationAxes.map((axis) => (
              <span
                key={axis.id}
                className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700"
              >
                {axis.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">選択肢数</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">
            {decision.options.length} 件
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">更新日時</p>
          <p className="mt-3 text-sm text-slate-700">
            {formatDateTime(decision.updatedAt)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">最終メモ</p>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
          {decision.note || "メモは未入力です。"}
        </p>
      </div>
    </section>
  );
}
