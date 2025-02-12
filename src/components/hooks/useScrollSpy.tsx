import { useEffect, useState } from 'react';

// Custom Types
import { SectionId } from '@/types';

interface UseScrollSpyOptions {
  offset?: number;  // Offset from the top to trigger section change
}

export const useScrollSpy = ({ offset = 400 }: UseScrollSpyOptions = {}) => {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = document.querySelectorAll<HTMLElement>('[data-section]');
      
      // Find the current section
      const current = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        // console.log(`${section.id} -top: ${rect.top}; bottom: ${rect.bottom}; ${offset}, ${rect.top <= offset && rect.bottom > offset}`)
        return rect.top <= offset && rect.bottom > offset;
        
      });

      if (current) {
        setActiveSection(current.dataset.section as SectionId);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return activeSection;
};