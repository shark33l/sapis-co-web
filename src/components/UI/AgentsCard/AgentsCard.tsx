import { AgentContent } from "@/assets/content/AgentsContent";

export interface AgentsCardProps extends AgentContent {
    id?: string,
    className?: string,
    style?: React.CSSProperties,
    animated?: boolean
}

const AgentsCard: React.FC<AgentsCardProps> = ({id, className, style, animated, name, description, webUrl, logoUrl}) => {
    return (
        <div id={id} className={`h-[150px] lg:h-[150px] border border-[brand-primary/50] rounded-3xl overflow-hidden group transition-all duration-300 ease-out hover:shadow-md ${animated? "animate-in-appear" : "invisible"} ${className}`} style={style}>
            <a id="agents-card-grid" href={webUrl} className="h-full max-h-full grid grid-rows-[60%,40%] justify-center">
                <div className="content-center justify-items-center  p-2">
                    <img src={logoUrl} alt={name} className="max-h-[70px] max-w-[180px] object-contain transition-transform ease-out duration-300 group-hover:scale-125"/>
                </div>
                <div className="items-center">
                    <p className="px-2 w-full text-center font-bold absolute left-1/2 -translate-x-1/2 translate-y-1 opacity-100 transition-all ease-out duration-300 group-hover:-translate-y-6 group-hover:opacity-0">{name}</p>
                    <p className="px-2 w-full text-sm text-center absolute left-1/2 -translate-x-1/2 translate-y-6 opacity-0 transition-all ease-out duration-300 group-hover:-translate-y-0 group-hover:opacity-100">{description}</p>
                </div>
            </a>
        </div>
    )
}

export default AgentsCard;