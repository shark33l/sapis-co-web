// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

import { navItems } from '../Navigation/NavBar.tsx';
import { HeaderChip, HeaderTitle, TitleContainer, TitleUnderline } from "../UI/SectionHeader/SectionHeader";

const OurPurpose = () => {
    const sectionId: SectionId = 'our-purpose';
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3 lg:px-20 mb-10 h-[1000px]">
                <TitleContainer>
                    <HeaderChip animated={hasAnimated}>
                        OUR PURPOSE
                    </HeaderChip>
                    <HeaderTitle animated={hasAnimated} style={{ animationDelay: `${0.25 * 1}s`, animationFillMode: 'both' }}>
                        We <TitleUnderline animated={hasAnimated}>build with purpose,</TitleUnderline> guided by<br/>vision, mission and values.
                    </HeaderTitle>
                </TitleContainer>
            </div>
        </section>
    )
}

export default OurPurpose;