import './index.scss';

/*
 * The support agent app rebuild, before and after.
 *
 * Every fact here is on the resume: a legacy AngularJS Zendesk app replaced by
 * React and TypeScript in a Kustomer iframe, with the data layer moved from
 * REST to GraphQL, cutting time to interactive by 63%.
 *
 * The REST side deliberately carries no request count. The round-trip number
 * is not something the resume states, and inventing one to make the picture
 * tidier would make the diagram the least trustworthy thing on the page.
 */

const Column = ({
  x,
  eyebrow,
  host,
  app,
  transport,
  accent,
}: {
  x: number;
  eyebrow: string;
  host: string;
  app: string;
  transport: string;
  accent?: boolean;
}) => {
  const mid = x + 150;
  const line = accent ? ' diagram__line--accent' : '';
  const arrow = accent ? ' diagram__arrow--accent' : '';

  return (
    <g>
      <text className="diagram__meta" x={x} y={22}>
        {eyebrow}
      </text>

      {/* Host application: the shell the app is embedded in */}
      <rect
        className={`diagram__surface${accent ? ' diagram__surface--accent' : ''}`}
        x={x}
        y={36}
        width={300}
        height={104}
        rx={6}
      />
      <text className="diagram__edge" x={x + 16} y={60}>
        {host}
      </text>

      {/* The app itself */}
      <rect
        className="diagram__surface--inner"
        x={x + 16}
        y={72}
        width={268}
        height={52}
        rx={4}
      />
      <text
        className="diagram__label diagram__label--strong"
        x={mid}
        y={104}
        textAnchor="middle"
      >
        {app}
      </text>

      {/* Transport down to the services layer */}
      <path className={`diagram__line${line}`} d={`M${mid} 140 L${mid} 196`} />
      <path
        className={`diagram__arrow${arrow}`}
        d={`M${mid} 204 l-5 -9 l10 0 z`}
      />
      <text className="diagram__edge" x={mid + 12} y={172}>
        {transport}
      </text>

      <rect
        className="diagram__surface"
        x={x}
        y={208}
        width={300}
        height={48}
        rx={6}
      />
      <text className="diagram__label" x={mid} y={238} textAnchor="middle">
        Novo services
      </text>
    </g>
  );
};

const SupportAppRebuild = () => (
  <svg
    className="diagram"
    viewBox="0 0 700 310"
    role="img"
    aria-labelledby="diag-support-title diag-support-desc"
  >
    <title id="diag-support-title">
      The support agent app, before and after the rebuild
    </title>
    <desc id="diag-support-desc">
      Before: a legacy AngularJS application embedded in Zendesk, talking to
      Novo services over REST. After: a React and TypeScript application
      embedded in Kustomer, talking to the same services over GraphQL. Time to
      interactive fell by 63 percent.
    </desc>

    <Column
      x={0}
      eyebrow="Before"
      host="Zendesk"
      app="AngularJS"
      transport="REST"
    />
    <Column
      x={400}
      eyebrow="After"
      host="Kustomer"
      app="React + TypeScript"
      transport="GraphQL"
      accent
    />

    {/* The result, spanning both columns */}
    <path className="diagram__line diagram__line--accent" d="M0 284 L700 284" />
    <text className="diagram__meta" x={0} y={304}>
      Time to interactive
    </text>
    <text className="diagram__result" x={700} y={306} textAnchor="end">
      63% faster
    </text>
  </svg>
);

export default SupportAppRebuild;
