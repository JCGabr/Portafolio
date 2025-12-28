  import React, { memo } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { FaPlus } from 'react-icons/fa';
  import { useSocialMenu } from './SocialMenu/useSocialMenu';
  import { DEFAULT_SOCIAL_LINKS, ANIMATION_CONFIG, BUTTON_SIZES } from './SocialMenu/socialMenuConfig';
  import type { SocialMenuProps, SocialLink } from './SocialMenu/types';
  import '../components_styles/SocialMenu.css';

  /**
   * Componente individual de icono social (Memoizado)
   */
  const SocialIcon = memo(({ 
    link, 
    index, 
    totalIcons,
    size,
    onClose 
  }: { 
    link: SocialLink; 
    index: number; 
    totalIcons: number;
    size: 'small' | 'medium' | 'large';
    onClose: () => void;
  }) => {
    const Icon = link.icon;
    const iconSize = BUTTON_SIZES[size].iconSize;

    return (
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        onClick={onClose}
        className="social-icon-button"
        // Animaciones de entrada
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: index * ANIMATION_CONFIG.stagger.enter,
            ...ANIMATION_CONFIG.spring,
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20, 
          scale: 0.8,
          transition: { 
            delay: (totalIcons - index - 1) * ANIMATION_CONFIG.stagger.exit,
            duration: ANIMATION_CONFIG.duration.fade,
          }
        }}
        whileHover={{ 
          scale: 1.15,
          backgroundColor: `${link.color}15`,
          borderColor: link.color,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          ['--hover-color' as string]: link.color 
        }}
      >
        <Icon size={iconSize} />
      </motion.a>
    );
  });

  SocialIcon.displayName = 'SocialIcon';

  const SocialMenu: React.FC<SocialMenuProps> = ({
    links = DEFAULT_SOCIAL_LINKS,
    position = 'bottom-right',
    size = 'medium',
    closeOnClick = true,
  }) => {
    const { isOpen, toggle, close, menuRef } = useSocialMenu(true);
    const mainButtonSize = BUTTON_SIZES[size].main;
    const mainIconSize = BUTTON_SIZES[size].icon;

    const handleLinkClick = () => {
      if (closeOnClick) {
        close();
      }
    };

    return (
      <div 
        ref={menuRef}
        className={`social-menu-wrapper social-menu-${position}`}
        role="navigation"
        aria-label="Social media links"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="social-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION_CONFIG.duration.fade }}
              onClick={close}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION_CONFIG.duration.fade }}
              className="social-icons-container"
              role="menu"
            >
              {links.map((link, index) => (
                <SocialIcon
                  key={link.id}
                  link={link}
                  index={index}
                  totalIcons={links.length}
                  size={size}
                  onClose={handleLinkClick}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB button */}
        <motion.button
          onClick={toggle}
          aria-label={isOpen ? 'Close social menu' : 'Open social menu'}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="social-main-button"
          style={{
            width: mainButtonSize,
            height: mainButtonSize,
          }}
          // Hover effects
          whileHover={{ 
            scale: 1.05,
            borderColor: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
          whileTap={{ scale: 0.95 }}
          // Focus visible para a11y
          whileFocus={{
            boxShadow: '0 0 0 3px rgba(147, 112, 219, 0.5)',
          }}
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ 
              duration: ANIMATION_CONFIG.duration.rotate,
              ease: 'easeInOut' 
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FaPlus size={mainIconSize} />
          </motion.div>
        </motion.button>
      </div>
    );
  };

  // Memoizar el componente completo
  export default memo(SocialMenu);