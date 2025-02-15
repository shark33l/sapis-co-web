import { ReactNode } from 'react';

// Interfaces
interface TitleContainerProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

interface HeaderChipProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    animated?: boolean;
}

interface HeaderTitleProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    animated?: boolean;
}

interface TitleUnderlineProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    animated?: boolean;
}

// Components
const TitleContainer: React.FC<TitleContainerProps> = ({ children, className, id, style }) => (
    <div id={id} className={`flex flex-col items-center justify-center m-3 pt-5 ${className}`} style={style}>
        {children}
    </div>
);

const HeaderChip: React.FC<HeaderChipProps> = ({ children, className, id, style, animated }) => (
    <div
        id={id}
        className={`flex items-center justify-center w-[180px] h-[40px] rounded-full bg-brand-primary text-white ${animated ? "animate-in-appear" : "invisible"} ${className}`}
        style={style}
    >
        <p className="font-semibold uppercase">{children}</p>
    </div>
);


const HeaderTitle: React.FC<HeaderTitleProps> = ({ children, className, id, style, animated }) => (
    <div
        id={id}
        className={`text-brand-primary text-center mt-5 ${animated ? "animate-in-appear" : "invisible"} ${className}`}
        style={style}
    >
        <p className="font-light text-[1.5rem] leading-[2rem] sm:text-[2rem] sm:leading-[2.4rem] md:text-[2.4rem] md:leading-[3rem] lg:text-[2.75rem] lg:leading-[3.4rem]">
            {children}
        </p>
    </div>
);

const TitleUnderline: React.FC<TitleUnderlineProps> = ({ children, className, id, style, animated = false }) => (
    <span
        id={id}
        className={`${animated ? "animated-underline" : "invisible"} ${className}`}
        style={style}
    >
        {children}
    </span>
);

export { TitleContainer, HeaderChip, HeaderTitle, TitleUnderline };
