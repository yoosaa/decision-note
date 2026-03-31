import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "decision-note における情報の取扱いとアクセス解析に関する方針です。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <Link
            href="/decisions"
            className="text-sm text-slate-600 transition hover:text-slate-900"
          >
            ← アプリへ戻る
          </Link>
        </div>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <header className="mb-10">
            <p className="text-sm font-medium text-slate-500">decision-note</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              プライバシーポリシー
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              decision-note（以下「本サービス」といいます。）は、ユーザーのプライバシーを尊重し、
              取得する情報の取扱いについて以下のとおり定めます。
            </p>
          </header>

          <div className="space-y-10 text-sm leading-7 text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                1. 取得する情報
              </h2>

              <div className="mt-4 space-y-5">
                <div>
                  <h3 className="font-medium text-slate-900">
                    (1) ユーザーが入力する情報
                  </h3>
                  <p className="mt-2">
                    本サービスでは、意思決定テーマ、選択肢、メリット、デメリット、
                    評価軸、メモ等、ユーザーが入力した内容を取り扱います。
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">
                    (2) ブラウザに保存される情報
                  </h3>
                  <p className="mt-2">
                    本サービスでは、入力内容や作成したデータをユーザーのブラウザ内
                    （localStorage）に保存することがあります。
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">
                    (3) アクセス解析に関する情報
                  </h3>
                  <p className="mt-2">
                    本サービスでは、利用状況の把握およびサービス改善のため、
                    Microsoft Clarity を利用しています。これにより、閲覧ページ、
                    操作状況、利用環境、アクセス元情報等が収集される場合があります。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                2. 情報の利用目的
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>本サービスの機能提供のため</li>
                <li>利用状況の把握および分析のため</li>
                <li>ユーザー体験の改善のため</li>
                <li>不具合の発見および改善のため</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                3. localStorage の利用について
              </h2>
              <p className="mt-4">
                本サービスでは、ユーザーが入力した情報をブラウザ内に保存するために
                localStorage
                を利用することがあります。これらの情報は、原則として
                ユーザーご自身の利用端末内に保存されます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                4. アクセス解析ツールについて
              </h2>
              <p className="mt-4">
                本サービスでは、Microsoft が提供する Microsoft Clarity
                を利用しています。 Microsoft Clarity
                は、ユーザーによる本サービスの利用状況を分析するために、 Cookie
                その他の技術を利用する場合があります。
              </p>
              <p className="mt-3">
                Microsoft Clarity により収集される情報の取扱いについては、
                Microsoft の定めるプライバシー関連の規定等をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                5. 個人情報の取扱いについて
              </h2>
              <p className="mt-4">
                本サービスは、個人を特定することを目的として情報を収集するものではありません。
                ただし、ユーザーが入力する内容によっては、個人的な情報が含まれる場合があります。
                そのため、機微な情報や第三者の個人情報の入力は、ユーザーご自身の判断と責任のもとで行ってください。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                6. 外部サービスの利用
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Microsoft Clarity（アクセス解析）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                7. プライバシーポリシーの変更
              </h2>
              <p className="mt-4">
                本サービスは、必要に応じて本ポリシーを変更することがあります。
                変更後のプライバシーポリシーは、本サービス上に掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                8. お問い合わせ
              </h2>
              <p className="mt-4">
                本サービスに関するお問い合わせがある場合は、 GitHub
                リポジトリ等の公開先に記載する連絡方法をご確認ください。
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
