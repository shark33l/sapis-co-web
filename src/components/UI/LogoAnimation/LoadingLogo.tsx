import { useEffect, useRef } from "react";
import gsap from "gsap";

const LoadingLogo = () => {
    const waveRef = useRef(null);
    const iconRef = useRef(null);
    const textLogoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Set initial positions
        gsap.set(containerRef.current, {
            x: "25%" // Center the icon initially
        });

        gsap.set(textLogoRef.current, {
            opacity: 0,
            x: -50
        });

        // Initial fade in of icon
        tl.fromTo(iconRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.inOut" }
        );

        // Wave animation
        const waveAnimation = gsap.to(waveRef.current, {
            attr: { d: "M0 0 Q 25 40, 50 0 T 100 -10 T 150 0 T 200 0 V 200 H 0 Z" },
            duration: 3,
            ease: "power2.out",
            onComplete: () => {
                // Stop the side-to-side animation when wave reaches top
                sideToSideAnimation.kill();

                // Animate icon to the left and fade in text
                const finalAnim = gsap.timeline();
                finalAnim
                    .to(containerRef.current, {
                        x: 0,
                        duration: 0.5,
                        ease: "power2.inOut"
                    })
                    .to(textLogoRef.current, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    }, "-=0.3"); // Slight overlap with icon movement
            }
        });

        // Side-to-side wave movement
        const sideToSideAnimation = gsap.to(waveRef.current, {
            x: "-20",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Cleanup function
        return () => {
            waveAnimation.kill();
            sideToSideAnimation.kill();
        };
    }, []);

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 origin-center w-[600px]">
            {/* Flex container for icon and text */}
            <div ref={containerRef} className="flex items-center">
                <div ref={iconRef} className="ml-[95px]">
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Grayscale Logo */}
                        <image
                            href="/Sapis_Logo_Icon_SHK.svg"
                            width="200"
                            height="200"
                        />

                        {/* Mask with Wave */}
                        <mask id="waveMask">
                            <rect width="200" height="200" fill="white" />
                            <path
                                ref={waveRef}
                                d="M0 200 Q 25 160, 50 200 T 100 200 T 150 200 T 200 200 V 200 H 0 Z"
                                fill="black"
                            />
                        </mask>

                        {/* Colored Logo (Revealed by Wave) */}
                        <image
                            href="/Sapis_Logo_Icon_SHK.svg"
                            width="200"
                            height="200"
                            mask="url(#waveMask)"
                            style={{ filter: "grayscale(100%) brightness(1.5)", opacity: 1 }}
                        />
                    </svg>
                </div>

                {/* Text logo */}
                <div ref={textLogoRef} className="-ml-[30px]">
                    <svg
                        className="h-[100px]"
                        width="400"
                        viewBox="200 0 800 200"
                        preserveAspectRatio="xMinYMid meet"
                    >
                        <clipPath id="textOnly">
                            <rect x="280" y="0" width="800" height="200" />
                        </clipPath>
                        <image
                            href="/Sapis_Logo_SHK_Full.svg"
                            height="200"
                            width="1000"
                            clipPath="url(#textOnly)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default LoadingLogo;