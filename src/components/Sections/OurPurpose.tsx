import { useState } from "react";

// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderChip, HeaderTitle, TitleContainer, TitleUnderline } from "../UI/SectionHeader/SectionHeader";
import PurposeCard from "../UI/PurposeCard/PurposeCard.tsx";
import CoreValuesCard from "../UI/CoreValuesCard/CoreValuesCard.tsx";


// Content
import { navItems } from '../Navigation/NavBar.tsx';
import { purposeContents } from "../../assets/content/PurposeContent.tsx";
import { coreValuesContent } from "../../assets/content/CoreValuesContent.tsx";


const OurPurpose = () => {
    const sectionId: SectionId = 'our-purpose';
    const [activeCoreitem, setActiveCoreitem] = useState(0)
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3 lg:px-20 mb-10">
                <div id="purpose-section">
                    <TitleContainer>
                        <HeaderChip animated={hasAnimated}>
                            OUR PURPOSE
                        </HeaderChip>
                        <HeaderTitle animated={hasAnimated} style={{ animationDelay: `${0.25 * 1}s`, animationFillMode: 'both' }}>
                            We <TitleUnderline animated={hasAnimated}>build with purpose,</TitleUnderline> guided by<br />vision, mission and values.
                        </HeaderTitle>
                    </TitleContainer>
                    <div id="purpose-cards-container">
                        {purposeContents.length && (
                            <div id="purpose-cards-grid" className="grid md:grid-cols-2 gap-5 my-10">
                                {purposeContents.map((purpose, index) => {
                                    return (
                                        <PurposeCard
                                            key={`purpose-card-${index}`}
                                            id={`purpose-card-${index}`}
                                            title={purpose.title}
                                            description={purpose.description}
                                            animated={hasAnimated}
                                            style={{ animationDelay: `${0.25 * (3 + index)}s`, animationFillMode: 'both' }}/>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div id="core-value-section">
                    <TitleContainer>
                        <HeaderChip animated={hasAnimated} style={{ animationDelay: `${0.25 * 8}s`, animationFillMode: 'both'}}>
                            OUR CORE VALUES
                        </HeaderChip>
                    </TitleContainer>
                    <div id="core-values-cards-container">
                        {coreValuesContent.length && (
                            <div id="core-values-cards-grid" className="space-y-2 md:flex md:gap-2 my-10 ">
                                {coreValuesContent.map((coreValue, index) => {

                                    return(
                                        <CoreValuesCard
                                            key={`core-value-card-${index}`}
                                            id={`core-value-card-${index}`}
                                            onMouseEnter={() => setActiveCoreitem(index)}
                                            isActive={activeCoreitem === index}
                                            title={coreValue.title}
                                            description={coreValue.description}
                                            animated={hasAnimated}
                                            style={{ animationDelay: `${0.25 * (2 + 9+index)}s`, animationFillMode: 'both' }}
                                            className={`transition-all duration-1000 ease-in-out w-[100%] md:w-[17%] md:hover:w-[34%] ${activeCoreitem === index && 'md:w-[34%]'}`}/>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurPurpose;