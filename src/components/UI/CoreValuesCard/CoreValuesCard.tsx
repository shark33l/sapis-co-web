import { CoreValuesInterface } from "@/assets/content/CoreValuesContent";

export interface CoreValuesCardProps extends CoreValuesInterface {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    animated?: boolean;
    onMouseEnter: () => void;
    isActive: boolean;
}

const CoreValuesCard: React.FC<CoreValuesCardProps> = ({title, description, className, style, id, animated, onMouseEnter, isActive}) => {
    return (
        <div id={id} className={`group ${className} ${animated? "animate-in-appear" : "invisible"}`} style={style} onMouseEnter={onMouseEnter}>
            <div id="pupose-card-container" className={`h-[150px] rounded-3xl border border-brand-primary bg-brand-primary bg-opacity-0 transitions-all duration-300 p-5 md:p-3 xl:p-5 text-left grid grid-flow-row ${isActive && 'bg-opacity-100'} cursor-pointer`}>
                <div id="purpose-title" className="relative transition-all duration-500">
                    <p className={`absolute font-normal transition-all duration-500 ${isActive ? 'text-2xl text-white top-0 left-0 translate-x-0 translate-y-0' : 'text-gray-600 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center'}`}>{title}</p>
                </div>
                <div id="purpose-description" className={`items-center ${isActive ? 'grid' : 'hidden'}`}>
                    <p className={`text-sm text-white ${isActive ? "animate-in-appear" : "invisible"}`} style={{ animationDelay: `500ms`, animationFillMode: 'both' }}>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default CoreValuesCard;