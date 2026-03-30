import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "意思決定ノート",
  description: "意思決定ノート",
};

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>

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
    </html>
  );
}
