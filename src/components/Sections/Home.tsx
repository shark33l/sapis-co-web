import { useState, useEffect } from "react";

// Assets
import HeroImage from '/images/home-hero.jpg'
import LiquidScene from "../UI/Scene/LiquidScene";
import MetallicFluidShader from "../UI/Scene/MettalicFluidShader";
import LiquidShader from "../UI/Scene/LiquidShader";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate a 3-second loading delay
    // useEffect(() => {
    //     const timer = setTimeout(() => setIsLoaded(true), 3000);
    //     return () => clearTimeout(timer); // Cleanup on unmount
    // }, []);

    return (
        <section
            id="home"
            data-section="home"
            >
            <div
                id="HeroSection"
                className="min-h-full flex flex-col md:flex-row items-stretch space-y-1 md:space-x-1 md:space-y-0 mx-1 py-1">
                <div id="hero-left" className="relative overflow-hidden rounded-3xl min-h-[220px] md:min-h-full basis-1/2 animate-in-appear">
                    <div className='relative text-white grid grid-rows-12 p-5 min-h-[220px] md:min-h-full md:p-10 z-10 pointer-events-none'>
                        <div className='row-span-5 flex justify-center md:justify-start'>
                            <p className='
                            font-extrabold
                            text-center text-[1.5rem] leading-[1.8rem] w-[300px]
                            md:text-[2.5rem] md:leading-[2.75rem] md:w-[100px] md:text-left'>Super Alpha Petroleum Infrastructure Services</p>
                        </div>
                        <div className='row-span-5 flex items-center justify-center md:justify-end'>
                            <p className='
                            font-arabic font-extrabold 
                            text-center text-[1.5rem] leading-[1.8rem] w-[300px]
                            md:text-[2.5rem] md:leading-[2.75rem] md:w-[270px] md:text-right'>سوبر الفا ﻟﺎعمال البنية التحتية للخدمات البترولية</p>
                        </div>
                        <div className='row-span-2 flex items-end justify-center'>
                            <p className='text-center text-sm md:text-[1.25rem] font-thin'>Powering the <span className='font-extrabold'>future</span> of Energy Infrastructure.</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 z-0 ">
                        {/* <LiquidScene className="h-full w-full"/> */}
                        <LiquidShader className="h-full w-full" />
                        {/* <MetallicFluidShader className="h-full w-full" /> */}
                    </div>
                </div>
                <div id="hero-right" className="flex relative bg-slate-400 rounded-3xl min-h-[350px] md:min-h-full basis-1/2 items-center justify-center overflow-hidden 
                    animate-in-appear" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    {/* Skeleton Loader */}
                    {!isLoaded && (
                        <div className="flex inset-0 bg-gray-300 animate-ping rounded-3xl w-[50%] h-[50%] opacity-25"></div>
                    )}

                    {/* Hero Image */}
                    <img
                        src={HeroImage}
                        alt="Hero"
                        className="w-full h-full object-cover fade-in"
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
            </div>
        </section>
    )
}

export default Home;