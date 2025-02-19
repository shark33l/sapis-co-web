// Custom Types
import { SectionId } from "@/types";

// Custom hooks
import useSectionAnimationIdentifier from "../hooks/useSectionAnimationIdentifier.tsx";

// Custom Components
import { HeaderTitle, TitleContainer, TitleUnderline } from "../UI/SectionHeader/SectionHeader";


// Content
import { navItems } from '../Navigation/NavBar.tsx';

const Contact = () => {
    const sectionId: SectionId = 'contact';
    const { hasAnimated } = useSectionAnimationIdentifier({
        sectionId: sectionId,
        navItems
    })

    return (
        <section id={sectionId} data-section={sectionId} className=" bg-brand-primary">
            <div id="container" className="container px-3 lg:px-20 pb-10 min-h-[400px]">
                <div id="contact-grid" className="grid grid-cols-1 md:grid-cols-2">
                    <div id="header-section">
                        <TitleContainer>
                            <HeaderTitle className="!text-left !text-white !self-start" animated={hasAnimated} style={{ animationDelay: `${0.25 * 1}s`, animationFillMode: 'both' }}>
                                Have Questions?<br/> <TitleUnderline className="after:!bg-white" animated={hasAnimated}>Let's Connect</TitleUnderline> Today.
                            </HeaderTitle>
                        </TitleContainer>
                    </div>
                    <div id="detail-section" className="m-3 md:pt-5 w-full grid">
                        <div id="detail-section-container" className="w-fit md:justify-self-center">
                        <div id="email-section" className={`mb-5 ${hasAnimated ? "animate-in-appear" : "invisible"}`} style={{ animationDelay: `${0.25 * 4}s`, animationFillMode: 'both' }}>
                            <p className="text-white/40 font-bold mt-6">EMAIL</p>
                            <a href="Mailto:hamad@sapis.co" className="text-lg md:text-2xl text-white mt-2">Hamad@sapis.co</a>
                        </div>
                        <div id="phone-section" className={`mb-5 ${hasAnimated ? "animate-in-appear" : "invisible"}`} style={{ animationDelay: `${0.25 * 5}s`, animationFillMode: 'both' }}>
                            <p className="text-white/40 font-bold mt-2">PHONE NUMBER</p>
                            <a  href="Tel:+96558888282" className="text-lg md:text-2xl text-white mt-2">+965 58888282</a>
                        </div>
                        <div id="address-section" className={`mb-5 ${hasAnimated ? "animate-in-appear" : "invisible"}`} style={{ animationDelay: `${0.25 * 6}s`, animationFillMode: 'both' }}>
                            <p className="text-white/40 font-bold mt-2">ADDRESS</p>
                            <a className="text-lg md:text-2xl text-white mt-2">Building 1, Floor 6, Office 2,<br/>
                               Al Retaj Tower, Block 7, Makka Street,<br/>
                               Kuwait, Fahaheel</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;