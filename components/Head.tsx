import { JSX } from "preact";

export default function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <head>
        <title>あれから何日？｜あれなん日？</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="あれから何日？" />
        <meta property="og:image" content="https://github.com/Ehor-developer/Date-App/blob/main/static/img/ogp.png?raw=true" />
        <meta property="og:title" content="あれから何日？" />
        <meta property="og:url" content="date-app.deno.dev" />
        <meta property="og:site_name" content="Ehor.apps" />
        <meta property="og:description" content="このアプリは、あれから何日経過したかの記念日を記録・表示できるアプリです。ぜひお使いください。" />
      </head>
    </>
  );
}
