import type { IconType } from 'react-icons';

export interface SocialLink {
  id: string;
  icon: IconType;
  label: string;
  href: string;
  color: string;
}

export interface SocialMenuProps {
  links?: SocialLink[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
  closeOnClick?: boolean;
}

export interface UseSocialMenuReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}