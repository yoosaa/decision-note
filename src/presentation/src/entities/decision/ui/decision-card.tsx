import Link from "next/link";

type DecisionCardProps = {
  item: {
    id: string;
    title: string;
    description: string;
    optionCount: number;
    updatedAt: string;
  };
};

function formatUpdatedAt(value: string): string {
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

export function DecisionCard({ item }: DecisionCardProps) {
  return (
    <Link
      href={`/decisions/${item.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4">
        <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
          {item.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {item.description || "説明は未入力です。"}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>選択肢 {item.optionCount} 件</span>
        <span>{formatUpdatedAt(item.updatedAt)}</span>
      </div>
    </Link>
  );
}
