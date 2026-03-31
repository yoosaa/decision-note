import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://decision-note-eight.vercel.app"),
  title: {
    default: "decision-note | 意思決定を整理する比較メモ",
    template: "%s | decision-note",
  },
  description:
    "選択肢ごとのメリット・デメリット・評価軸を整理しながら、意思決定を比較して考えられるメモアプリです。",
  applicationName: "decision-note",
  openGraph: {
    title: "decision-note | 意思決定を整理する比較メモ",
    description:
      "選択肢ごとのメリット・デメリット・評価軸を整理しながら、意思決定を比較して考えられるメモアプリです。",
    url: "https://decision-note-eight.vercel.app",
    siteName: "decision-note",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "decision-note | 意思決定を整理する比較メモ",
    description:
      "選択肢ごとのメリット・デメリット・評価軸を整理しながら、意思決定を比較して考えられるメモアプリです。",
  },
};

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}

        {clarityProjectId ? (
          <script id="microsoft-clarity" type="text/javascript">
            {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
					`}
          </script>
        ) : null}
      </body>
    </html>
  );
}
