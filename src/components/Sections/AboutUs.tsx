// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderChip, HeaderTitle, TitleContainer, TitleUnderline } from "../UI/SectionHeader/SectionHeader";

import { navItems } from '../Navigation/NavBar.tsx'

const AboutUs = () => {
    const sectionId:SectionId = 'about';
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3">
                <TitleContainer>
                    <HeaderChip animated={hasAnimated}>
                        ABOUT US
                    </HeaderChip>
                    <HeaderTitle animated={hasAnimated} style={{ animationDelay: `${0.25 * 1}s`, animationFillMode: 'both' }}>
                    We provide infrastructure solutions<br/>that <TitleUnderline animated={hasAnimated}>power</TitleUnderline> the oil and gas industry.
                    </HeaderTitle>
                </TitleContainer>
                <div id="paragraph-container"
                    className={`
                    flex items-center justify-center m-10
                    ${hasAnimated ? "animate-in-appear" : "invisible"}
                    `}
                    style={{ animationDelay: `${0.25 * 6}s`, animationFillMode: 'both' }}>
                    <p className="w-[550px] text-sm text-center font-normal text-black leading-relaxed">
                    Introducing SAPIS, a leading provider of comprehensive infrastructure services and products 
                    for the oil and gas sector. Specializing in pipelines and casing, we are proud suppliers of 
                    casing for <span className="font-bold">Kuwait Oil Company (KOC)</span>. Our offerings extend to spare parts for drilling, 
                    transportation services, and rental of heavy and light equipment. Additionally, we provide 
                    skilled technical and general manpower, including labor and engineers, ensuring excellence in every project.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;