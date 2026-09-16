import { METRICS, type MetricId } from '@/content/metrics';
import './index.scss';

interface Props {
  ids: readonly MetricId[];
  /** 'proof' is the homepage row; 'inline' is the compact form used beside a
      timeline highlight. */
  variant?: 'proof' | 'inline';
}

/*
 * A <dl>, not a row of divs. Each figure is a value with a label, which is
 * exactly a description list, and it means a screen reader announces the two
 * as a pair instead of reading "27,000+" as a loose number in the page.
 *
 * .u-figures switches to tabular lining numerals. EB Garamond defaults to
 * old-style figures, which are right for prose and wrong for numbers meant to
 * be compared down a column.
 */
const MetricStrip = ({ ids, variant = 'proof' }: Props) => (
  <dl className={`metric-strip metric-strip--${variant}`}>
    {ids.map((id) => {
      const m = METRICS[id];
      return (
        <div className="metric-strip__item" key={id}>
          <dt className="metric-strip__value u-figures">{m.value}</dt>
          <dd className="metric-strip__label">{m.label}</dd>
        </div>
      );
    })}
  </dl>
);

export default MetricStrip;
