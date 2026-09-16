/*
 * Dates are stored as `YYYY-MM` and formatted here, so the timeline can render
 * a range, compute a promotion interval, and emit a valid <time dateTime>
 * from one source. Hand-written strings could not do the arithmetic.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export type YearMonth = `${number}-${number}`;
export type Endpoint = YearMonth | 'present';

const parse = (ym: YearMonth): [number, number] => {
  const [y, m] = ym.split('-').map(Number);
  return [y, m];
};

export const formatMonth = (ym: Endpoint): string => {
  if (ym === 'present') return 'Present';
  const [y, m] = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
};

export const formatShort = (ym: Endpoint): string => {
  if (ym === 'present') return 'Present';
  const [y, m] = parse(ym);
  return `${MONTHS[m - 1].slice(0, 3)} ${y}`;
};

/** Machine-readable value for <time dateTime>. 'present' has none. */
export const dateTimeAttr = (ym: Endpoint): string | undefined =>
  ym === 'present' ? undefined : ym;

export const monthsBetween = (from: YearMonth, to: Endpoint): number => {
  const [fy, fm] = parse(from);
  const now = new Date();
  const [ty, tm] =
    to === 'present' ? [now.getFullYear(), now.getMonth() + 1] : parse(to);
  return (ty - fy) * 12 + (tm - fm);
};

/*
 * "Promoted after 14 months" is a fact a skimmer reads in a second. Two date
 * ranges sitting next to each other is arithmetic nobody does, which is how a
 * flat timeline loses the strongest signal on the page.
 */
export const humaniseDuration = (months: number): string => {
  if (months < 1) return 'less than a month';
  if (months < 24) return `${months} month${months === 1 ? '' : 's'}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0
    ? `${years} years`
    : `${years} year${years === 1 ? '' : 's'} ${rem} month${rem === 1 ? '' : 's'}`;
};
