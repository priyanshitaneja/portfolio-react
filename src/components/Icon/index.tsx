import type { CSSProperties } from 'react';

import type { IconData } from './icons';
import './index.scss';

type IconProps = {
  /** Import the specific icon, e.g. `iconReact` — see ./icons. */
  icon: IconData;
  /** Rendered size. FontAwesome's `fa-2xl` was 2em; that maps to size="2xl". */
  size?: 'inherit' | '2xl';
  className?: string;
  style?: CSSProperties;
  /** Supply only when the icon is the sole carrier of meaning. */
  title?: string;
};

/**
 * Icon — inlined SVG, no icon font.
 *
 * Replaces the Font Awesome CDN stylesheet. `fill="currentColor"` means these
 * inherit colour the same way the old <i> glyphs did, so existing colour rules
 * keep working unchanged.
 *
 * Takes the icon data rather than a name string on purpose: a name-keyed
 * lookup table cannot be tree-shaken, so every client component using one icon
 * would ship all of them.
 *
 * Decorative by default — aria-hidden with no accessible name, because every
 * current use sits beside text or inside an already-labelled control. Pass
 * `title` to opt into an accessible name.
 */
const Icon = ({ icon, size = 'inherit', className, style, title }: IconProps) => (
  <svg
    className={['icon', size === '2xl' && 'icon--2xl', className]
      .filter(Boolean)
      .join(' ')}
    style={style}
    viewBox={icon.viewBox}
    fill="currentColor"
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false">
    <path d={icon.path} />
  </svg>
);

export default Icon;
export type { IconData };
