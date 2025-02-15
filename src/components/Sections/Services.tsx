import { useState, useRef } from 'react';

// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderChip, TitleContainer } from "../UI/SectionHeader/SectionHeader";

import { navItems } from '../Navigation/NavBar.tsx';
import { servicesContents as services } from '../../assets/content/ServicesContent.tsx';
import ServicesCard from "../UI/ServicesCard/ServicesCard.tsx";

const Services = () => {
    const sectionId: SectionId = 'services';
    const cardsContainerRef = useRef<HTMLDivElement | null>(null);
    const mouseCordinatesRef = useRef<{ x: number; y: number } | null>(null);
    const [mouseCordinates, setMouseCordinates] = useState<{ x: number; y: number } | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    // Get Mouse Cordinates
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!cardsContainerRef.current) return;

        // Store the latest mouse position
        mouseCordinatesRef.current = { x: e.clientX, y: e.clientY };

        // Throttle updates using requestAnimationFrame
        if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(() => {
                setMouseCordinates(mouseCordinatesRef.current);
                animationFrameRef.current = null;
            });
        }
    };

    // Variables for the grid
    // Sort services by order
    const sortedServices = [...services].sort((a, b) => a.order - b.order);
    // The Services Cards Grid will be 3 columns, so checking if the length is divisible by 3 if not the first row would have the remainder
    const defaultGridCount = 3;
    const gridDivisibleRemainder = sortedServices.length % defaultGridCount;
    const firstRowCols = gridDivisibleRemainder === 0 ? defaultGridCount : gridDivisibleRemainder;

    return (
        <section id={sectionId} data-section={sectionId}>
            <div id="container" className="container px-3 lg:px-20 mb-10">
                <TitleContainer className="mb-10">
                    <HeaderChip animated={hasAnimated}>
                        SERVICES
                    </HeaderChip>
                </TitleContainer>
                <div id="service-cards-container" ref={cardsContainerRef} onMouseMove={handleMouseMove}>
                    {sortedServices.length && (
                        <div className={`space-y-2 md:grid md:grid-cols-6 md:gap-2`}>
                            {sortedServices.map((service, index) => {
                                const isFirstRow = index < firstRowCols;
                                // If it's the first row, assign col-span based on how many items there are, else default to 1 column per card
                                const colSpanClass = isFirstRow ? `col-span-${Math.ceil(6 / firstRowCols)}` : `col-span-2`;
                                return (
                                    <ServicesCard
                                        key={`service-card-${service.order}`}
                                        id={`service-card-${service.order}`}
                                        order={service.order}
                                        title={service.title}
                                        description={service.description}
                                        imageUrl={service.imageUrl}
                                        animated={hasAnimated}
                                        className={colSpanClass}
                                        mouseCordinates={mouseCordinates} />
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Services;