import type { DecisionComparisonDto } from "@/src/application/decision/dto/decision-comparison-dto";

type DecisionComparisonProps = {
  comparison: DecisionComparisonDto;
};

export function DecisionComparison({ comparison }: DecisionComparisonProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">比較結果</h2>
        <p className="mt-2 text-sm text-slate-600">
          選択肢ごとのスコアとメリット・デメリットを見比べられます。
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {comparison.options.map((option) => (
          <div
            key={option.id}
            className={[
              "rounded-2xl border p-5",
              option.isBest
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 bg-white",
            ].join(" ")}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {option.name}
                </h3>
                {option.isBest ? (
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    現時点の最高スコア
                  </p>
                ) : null}
              </div>

              <div className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
                {option.totalScore} 点
              </div>
            </div>

            <div className="space-y-3">
              {option.axisScores.map((axis) => (
                <div key={`${option.id}-${axis.axisId}`}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{axis.axisName}</span>
                    <span className="font-medium text-slate-900">
                      {axis.value} / 5
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-slate-700 transition-all"
                      style={{ width: `${(axis.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-800">
                  メリット
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {option.pros.length > 0 ? (
                    option.pros.map((pro, index) => (
                      <li
                        key={`${option.id}-pro-${index}`}
                        className="rounded-lg bg-slate-50 px-3 py-2"
                      >
                        {pro}
                      </li>
                    ))
                  ) : (
                    <li className="rounded-lg bg-slate-50 px-3 py-2 text-slate-400">
                      未入力
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-800">
                  デメリット
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {option.cons.length > 0 ? (
                    option.cons.map((con, index) => (
                      <li
                        key={`${option.id}-con-${index}`}
                        className="rounded-lg bg-slate-50 px-3 py-2"
                      >
                        {con}
                      </li>
                    ))
                  ) : (
                    <li className="rounded-lg bg-slate-50 px-3 py-2 text-slate-400">
                      未入力
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
