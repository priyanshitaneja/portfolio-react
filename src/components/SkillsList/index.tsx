import Icon, { type IconData } from '../Icon';
import {
  iconTerminal,
  iconNpm,
  iconGithub,
  iconCss3Alt,
  iconTailwindCss,
  iconSass,
  iconGit,
  iconCodeBranch,
  iconReact,
  iconSquareJs,
  iconTypescript,
  iconHtml5,
  iconClaude,
  iconOpenai,
  iconFigma,
  iconNodeJs,
  iconVuejs,
  iconShopify,
} from '../Icon/icons';

import './index.scss';

/*
 * Order is load-bearing: index.scss staggers the entrance animation with
 * :nth-child(N) delays, so these must stay direct siblings in this sequence.
 */
const SKILLS: { key: string; icon: IconData }[] = [
  { key: 'terminal', icon: iconTerminal },
  { key: 'npm', icon: iconNpm },
  { key: 'github', icon: iconGithub },
  { key: 'css3', icon: iconCss3Alt },
  { key: 'tailwind', icon: iconTailwindCss },
  { key: 'sass', icon: iconSass },
  { key: 'git', icon: iconGit },
  { key: 'code-branch', icon: iconCodeBranch },
  { key: 'react', icon: iconReact },
  { key: 'js', icon: iconSquareJs },
  { key: 'typescript', icon: iconTypescript },
  { key: 'html5', icon: iconHtml5 },
  { key: 'claude', icon: iconClaude },
  { key: 'openai', icon: iconOpenai },
  { key: 'figma', icon: iconFigma },
  { key: 'node', icon: iconNodeJs },
  { key: 'vue', icon: iconVuejs },
  { key: 'shopify', icon: iconShopify },
];

const SkillsList = () => {
  return (
    /*
     * <footer> rather than a <div>: this strip is the last thing in the
     * document and axe's `region` rule wants every node inside a landmark.
     * The element carries the existing class, so the fixed positioning and the
     * nth-child entrance stagger are untouched.
     */
    <footer className="skills_list-wrapper glass" aria-label="Technologies">
      <div className="skills_list">
        {SKILLS.map(({ key, icon }) => (
          <Icon key={key} icon={icon} size="2xl" />
        ))}
      </div>
    </footer>
  );
};

export default SkillsList;
