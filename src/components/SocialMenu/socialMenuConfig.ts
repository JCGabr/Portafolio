import { FaLinkedin, FaGithub} from 'react-icons/fa';
import type { SocialLink } from './types';

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    icon: FaLinkedin,
    label: 'LinkedIn Profile',
    href: 'https://linkedin.com/in/tu-usuario',
    color: '#0077B5',
  },
  {
    id: 'github',
    icon: FaGithub,
    label: 'GitHub Profile',
    href: 'https://github.com/tu-usuario',
    color: '#333',
  },
];

export const ANIMATION_CONFIG = {
  stagger: {
    enter: 0.06,
    exit: 0.03,
  },
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
  duration: {
    fade: 0.2,
    rotate: 0.3,
  },
} as const;

export const BUTTON_SIZES = {
  small: { main: 48, icon: 20, iconSize: 16 },
  medium: { main: 56, icon: 24, iconSize: 20 },
  large: { main: 64, icon: 28, iconSize: 24 },
} as const;