import type { InlineNode, RichText as RichTextValue } from '@/content/types';
import { METRICS } from '@/content/metrics';

/*
 * Renders the RichText union. A plain string is the overwhelmingly common
 * case and costs one branch; the array form exists so a sentence can carry a
 * link or an emphasis without the content file becoming a tree.
 */
const renderNode = (node: InlineNode, key: number) => {
  if (typeof node === 'string') return node;
  switch (node.kind) {
    case 'link':
      return (
        <a href={node.href} key={key}>
          {node.text}
        </a>
      );
    case 'em':
      return <em key={key}>{node.text}</em>;
    case 'metric':
      return (
        <strong className="u-figures" key={key}>
          {METRICS[node.id].value}
        </strong>
      );
    default: {
      /* Adding a node kind without a branch here fails `npm run typecheck`,
         which is step one of CI, rather than silently rendering nothing. */
      const exhaustive: never = node;
      return exhaustive;
    }
  }
};

const RichText = ({ value }: { value: RichTextValue }) =>
  typeof value === 'string' ? (
    <>{value}</>
  ) : (
    <>{value.map((node, i) => renderNode(node, i))}</>
  );

export default RichText;
