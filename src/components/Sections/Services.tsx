import { useState } from "react";

// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderChip, TitleContainer } from "../UI/SectionHeader/SectionHeader";

import { navItems } from '../Navigation/NavBar.tsx'
import { servicesContents as services } from '../../assets/content/ServicesContent.tsx'
import ServicesCard from "../UI/ServicesCard/ServicesCard.tsx";

const Services = () => {
    const sectionId: SectionId = 'services';
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    // Variables for the grid
    // Sort services by order
    const sortedServices = [...services].sort((a, b) => a.order - b.order);
    // The Services Cards Grid will be 3 columns, so checking if the length is divisible by 3 if not the first row would have the remainder
    const gridDivisibleRemainder = sortedServices.length % 3;
    const firstRowCols = gridDivisibleRemainder === 0 ? 3 : gridDivisibleRemainder;

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3 lg:px-20 mb-10">
                <TitleContainer className="mb-10">
                    <HeaderChip animated={hasAnimated}>
                        SERVICES
                    </HeaderChip>
                </TitleContainer>
                <div id="services-card-container">
                    {sortedServices.length && firstRowCols !== 3 && (
                        <div className={`grid md:grid-cols-${firstRowCols} gap-2`}>
                            {sortedServices.map((service, index) => {
                                if (index < gridDivisibleRemainder) {
                                    return (
                                        <ServicesCard
                                            order={service.order}
                                            title={service.title}
                                            description={service.description}
                                            imageUrl={service.imageUrl}
                                            animated={hasAnimated} />
                                    )
                                }
                            })}
                        </div>
                    )}

                    {sortedServices.length >= 3 && (
                        <div className={`grid md:grid-cols-3 gap-2 mt-2`}>
                            {sortedServices.map((service, index) => {
                                if (index >= gridDivisibleRemainder) {
                                    return (
                                        <ServicesCard
                                            key={`service-card-${service.order}`}
                                            id={`service-card-${service.order}`}
                                            order={service.order}
                                            title={service.title}
                                            description={service.description}
                                            imageUrl={service.imageUrl}
                                            animated={hasAnimated}  />
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Services;