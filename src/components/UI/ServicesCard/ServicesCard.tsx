import { CSSProperties, useState } from "react";
import { ServicesContentInterface } from "@/assets/content/ServicesContent";

export interface ServicesCardProps extends ServicesContentInterface {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    animated?: boolean;
}

const ServicesCard: React.FC<ServicesCardProps> = ({ order, title, description, imageUrl, className, style, id, animated }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const cardDefaultStyles:CSSProperties ={
        animationDelay: `${order != null ? (order+2) * 0.25 : 0}s`,
        animationFillMode: 'both' 
    }

    return (
        <div
            id={id}
            className={`group relative w-full h-[500px] rounded-3xl overflow-hidden ${className} flex items-center justify-center cursor-pointer ${animated ? "animate-in-appear" : "invisible"}`}
            style={{ ...cardDefaultStyles, ...style }}
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
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-500 group-hover:bg-brand-primary group-hover:bg-opacity-100"></div>

            {/* Content */}
            <div className="absolute inset-0 grid grid-rows-9 z-10 p-10">
                <div className="rounded-full bg-white h-10 w-10 flex items-center justify-center">
                    <p className="text-xl font-normal">{order < 10 ? `0${order}` : order}</p>
                </div>
                <div className="row-span-6 flex items-start justify-start pt-2">
                    <p className="text-4xl text-white w-[40%]">{title}</p>
                </div>
                <div className="row-span-2 row-start-8 flex items-end justify-start">
                    <p className="text-sm text-white w-[75%]">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;