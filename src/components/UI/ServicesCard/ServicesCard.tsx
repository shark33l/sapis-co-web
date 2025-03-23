import { CSSProperties, useEffect, useState, useRef } from "react";
import { ServicesContentInterface    } from "@/assets/content/ServicesContent";


export interface ServicesCardProps extends ServicesContentInterface {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    animated?: boolean;
    mouseCordinates?:{x: number, y:number} | undefined | null;
}

const ServicesCard: React.FC<ServicesCardProps> = ({ order, title, description, imageUrl, className, style, id, animated, mouseCordinates }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [relativeMouseCordinates, setRelativeMouseCordinates] = useState({x:0, y:0});


    // Calculate mouse cordinate for gradient and shadow
    useEffect(() => {
        if(cardRef.current) {
            const { left, top } = cardRef.current.getBoundingClientRect();
            const relativeX = mouseCordinates ? mouseCordinates.x - left : 0;
            const relativeY = mouseCordinates ? mouseCordinates.y - top : 0;

            // Mouse Position
            setRelativeMouseCordinates({ x: relativeX, y: relativeY });
        }
    }, [mouseCordinates])

    const cardDefaultStyles:CSSProperties ={
        animationDelay: `${order != null ? (order+2) * 0.25 : 0}s`,
        animationFillMode: 'both',
    }

    return (
        <div
            id={id}
            className={`bg-black  group relative w-full h-[500px] rounded-3xl overflow-hidden ${className} flex items-center justify-center cursor-pointer ${animated ? "animate-in-appear" : "invisible"}`}
            style={{ ...cardDefaultStyles, ...style }}
            ref={cardRef}
        >
            {/* Background Image */}
            <img
                src={imageUrl}
                alt={title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${!isLoaded ? "opacity-0" : "opacity-100"
                    }`}
                onLoad={() => setIsLoaded(true)}
            />

            {/* Loading Skeleton */}
            {!isLoaded && (
                <div className="flex inset-0 bg-gray-300 animate-ping rounded-3xl w-[50%] h-[50%] opacity-25"></div>
            )}

            {/* Dark Overlay (Default) */}
            <div className={`rounded-3xl absolute inset-0 bg-black bg-opacity-50 transition-all duration-1000 group-hover:bg-brand-primary group-hover:bg-opacity-100 `}
                ></div>

            {/* Mouse Gradient Follower */}
            <div 
                className="m-[3px] absolute inset-0 rounded-full h-full aspect-square -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,theme(colors.brand-secondary/30)_0%,rgba(0,0,0,0)_60%)] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                style={relativeMouseCordinates ? { top: relativeMouseCordinates.y, left: relativeMouseCordinates.x } : {}}></div>

            

            {/* Content */}
            <div className="absolute inset-0 grid grid-rows-9 z-10 p-10">
                <div className="rounded-full bg-white h-10 w-10 flex items-center justify-center">
                    <p className="text-xl font-normal">{order < 10 ? `0${order}` : order}</p>
                </div>
                <div className="row-span-6 flex items-start justify-start pt-2">
                    <p className="text-white text-4xl w-[60%] md:text-2xl md:w-[100%] lg:w-[40%] lg:text-4xl">{title}</p>
                </div>
                <div className="row-span-2 row-start-8 flex items-end justify-start">
                    <p className="text-sm text-white w-[75%] md:w-[100%] lg:w-[75%] transition-all duration-1000 group-hover:text-base">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;