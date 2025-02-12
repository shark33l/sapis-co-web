// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderChip, HeaderTitle, TitleContainer, TitleUnderline } from "../UI/SectionHeader/SectionHeader";

import { navItems } from '../Navigation/NavBar.tsx'

const Services = () => {
    const sectionId: SectionId = 'services';
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3 h-[1000px]">
                <TitleContainer>
                    <HeaderChip animated={hasAnimated}>
                        SERVICES
                    </HeaderChip>
                </TitleContainer>
            </div>
        </section>
    )
}

export default Services;