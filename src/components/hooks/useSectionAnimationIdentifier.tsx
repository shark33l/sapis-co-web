import { useState, useEffect } from 'react';
import { NavItem, SectionId } from '@/types';
import { useScrollSpy } from './useScrollSpy';


interface UseSectionAnimationProps {
    sectionId: SectionId;
    navItems: NavItem[];
    offset?: number;
}

const useSectionAnimationIdentifier = ({ sectionId, navItems, offset = 400 }: UseSectionAnimationProps) => {

    const activeSection = useScrollSpy({ offset: offset });
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);

    useEffect(() => {
        const currentSectionOrder = navItems.find(item => item.id === sectionId)?.order || 0;
        const activeSectionOrder = navItems.find(item => item.id === activeSection)?.order || 0;

        if (!hasAnimated && (activeSection === sectionId || currentSectionOrder <= activeSectionOrder)) {
            setHasAnimated(true);
        }
    }, [activeSection, hasAnimated, sectionId, navItems]);

    return { hasAnimated };
}

export default useSectionAnimationIdentifier;