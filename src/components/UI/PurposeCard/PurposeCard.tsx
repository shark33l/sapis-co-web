import { PurposeContentInterface } from "@/assets/content/PurposeContent";

export interface PurposeCardProps extends PurposeContentInterface {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    animated?: boolean;
}

const PurposeCard: React.FC<PurposeCardProps> = ({title, description, className, style, id, animated}) => {
    return (
        <div id={id} className={`${className} ${animated? "animate-in-appear" : "invisible"}`} style={style}>
            <div id="pupose-card-container" className="h-[340px] rounded-3xl border border-brand-primary p-1 px-6 xl:px-24 items-center justify-center text-center grid grid-flow-row grid-rows-4">
                <div id="purpose-title" className="row-span-1 w-full h-full content-center">
                    <p className="uppercase font-bold text-gray-600">{title}</p>
                </div>
                <div id="purpose-description" className="row-span-3 items-center pb-10">
                    <p className="text-3xl md:text-xl lg:text-2xl xl:text-3xl text-brand-primary">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default PurposeCard;