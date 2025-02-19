// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderChip, HeaderTitle, TitleContainer, TitleUnderline } from "../UI/SectionHeader/SectionHeader";

import { navItems } from '../Navigation/NavBar.tsx'
import { agentsContent } from "../../assets/content/AgentsContent.tsx";
import AgentsCard from "../UI/AgentsCard/AgentsCard.tsx";

const AboutUs = () => {
    const sectionId: SectionId = 'about';
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3">
                <div id="about-us-section">
                    <TitleContainer>
                        <HeaderChip animated={hasAnimated}>
                            ABOUT US
                        </HeaderChip>
                        <HeaderTitle animated={hasAnimated} style={{ animationDelay: `${0.25 * 1}s`, animationFillMode: 'both' }}>
                            We provide infrastructure solutions<br />that <TitleUnderline animated={hasAnimated}>power</TitleUnderline> the oil and gas industry.
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
            </div>
            {agentsContent.length && (
                <div id="official-agents-section" className="container px-3 mb-10 lg:px-20">
                <TitleContainer>
                    <HeaderChip animated={hasAnimated} style={{ animationDelay: `${0.25 * 8}s`, animationFillMode: 'both' }}>
                        BRANDS WE REPRESENT
                    </HeaderChip>
                    <HeaderTitle animated={hasAnimated} style={{ animationDelay: `${0.25 * 9}s`, animationFillMode: 'both' }}>
                        We bring global brands<br/>to Kuwait as <TitleUnderline animated={hasAnimated}>official agents.</TitleUnderline>
                    </HeaderTitle>
                </TitleContainer>
                <div id="agents-grid-container" className="max-w-full flex flex-wrap justify-center place-content-center gap-2 md:gap-5 pt-10 py-5">
                    {agentsContent.map((agent, index) => (
                        <AgentsCard
                            key={`agent-card-${index}`}
                            id={`agent-card-${index}`}
                            name={agent.name}
                            description={agent.description}
                            webUrl={agent.webUrl}
                            logoUrl={agent.logoUrl}
                            animated={hasAnimated}
                            style={{ animationDelay: `${0.25 * 10+(index/2)}s`, animationFillMode: 'both' }}
                            className="w-[48%] md:w-[19%]"
                            />
                    ))}
                </div>
            </div>
            )}
        </section>
    )
}

export default AboutUs;