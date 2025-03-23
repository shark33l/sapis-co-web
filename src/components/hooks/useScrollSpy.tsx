import { useEffect, useState } from 'react';

// Custom Types
import { SectionId } from '@/types';
import { navItems } from '../Navigation/NavBar';

interface UseScrollSpyOptions {
  offset?: number;  // Offset from the top to trigger section change
}

export const useScrollSpy = ({ offset = 400 }: UseScrollSpyOptions = {}) => {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const navitemsIdList: SectionId[] = navItems.sort((a, b) => a.order - b.order).map((navItem) => (navItem.id))

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

      // Find page bottom
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight

      const isEndOfPage =  scrollPosition >= pageHeight - 1; 

      if (current && !isEndOfPage) {
        setActiveSection(current.dataset.section as SectionId);
      }

      if (isEndOfPage) {
        setActiveSection(navitemsIdList[navitemsIdList.length - 1] as SectionId)
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