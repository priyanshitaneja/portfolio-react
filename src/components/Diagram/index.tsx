import SupportAppRebuild from './SupportAppRebuild';
import type { DiagramId } from '@/content/types';

/*
 * The diagram registry. Content references a diagram by id, so a content file
 * never imports a component and the two stay independent.
 */
const REGISTRY: Record<DiagramId, () => React.JSX.Element> = {
  'support-app-rebuild': SupportAppRebuild,
};

const Diagram = ({ id }: { id: DiagramId }) => {
  const Component = REGISTRY[id];
  return <Component />;
};

export default Diagram;
