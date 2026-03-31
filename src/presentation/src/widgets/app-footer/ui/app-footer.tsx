import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© decision-note</p>

        <div className="flex items-center gap-4">
          <Link href="/privacy" className="transition hover:text-slate-900">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
