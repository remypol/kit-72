/**
 * BottomSheet Component
 *
 * A slide-up modal for mobile sub-navigation.
 * Used by BottomNav for Guías and Herramientas menus.
 *
 * Features:
 * - Slides up from bottom with backdrop
 * - Dismisses on tap outside or swipe down
 * - Accessible with proper ARIA attributes
 * - Touch-friendly items with icons
 */

import { useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';

interface BottomSheetItem {
  icon: string;
  label: string;
  description?: string;
  href: string;
}

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: BottomSheetItem[];
  footerLink?: {
    label: string;
    href: string;
  };
  closeLabel?: string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  items,
  footerLink,
  closeLabel = 'Cerrar',
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle touch swipe to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0 && sheetRef.current) {
      // Swiping down
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    const diff = currentY.current - startY.current;

    if (sheetRef.current) {
      if (diff > 100) {
        // Swiped down enough to close
        onClose();
      }
      sheetRef.current.style.transform = '';
    }

    startY.current = 0;
    currentY.current = 0;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`bottom-sheet-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`bottom-sheet ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle for swipe indication */}
        <div className="bottom-sheet-handle" />

        {/* Header */}
        <div className="bottom-sheet-header">
          <h2 className="bottom-sheet-title">{title}</h2>
          <button
            type="button"
            className="bottom-sheet-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="bottom-sheet-content">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="bottom-sheet-item"
              onClick={onClose}
            >
              <span className="bottom-sheet-item-icon">
                <Icon name={item.icon} size={24} />
              </span>
              <span className="bottom-sheet-item-content">
                <span className="bottom-sheet-item-title">{item.label}</span>
                {item.description && (
                  <span className="bottom-sheet-item-description">
                    {item.description}
                  </span>
                )}
              </span>
              <Icon name="ChevronRight" size={20} />
            </a>
          ))}

          {/* Footer link */}
          {footerLink && (
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <a
                href={footerLink.href}
                className="bottom-sheet-item"
                onClick={onClose}
              >
                <span className="bottom-sheet-item-content">
                  <span className="bottom-sheet-item-title text-accent">
                    {footerLink.label}
                  </span>
                </span>
                <Icon name="ChevronRight" size={20} />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
