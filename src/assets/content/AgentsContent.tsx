// import catalyst_logo from '/images/agents/Catalyst_Logo.avif';
import dvs_logo from '/images/agents/DVS_Dervos_Logo.png';
import petrostar_logo from '/images/agents/petrostar_logo.webp';

export interface AgentContent {
    name: string,
    description: string,
    logoUrl: string,
    webUrl?: string,
}

export const agentsContent: AgentContent[] = [
    // {
    //     name: "Catalyst",
    //     description: "Drilling Fluids and Specialty Chemicals",
    //     webUrl: "https://www.catalystdrillchem.in/",
    //     logoUrl: catalyst_logo
    // },
    {
        name: "DVS Dervos Valve",
        description: "Valve Manufacturer and Pipe Valves Supplier",
        webUrl: "https://www.dervosvalve.com/",
        logoUrl: dvs_logo
    },
    {
        name: "Petrostar Automation",
        description: "Engineering company in Oil, Power, Petrochemicals & Water Treatment.",
        webUrl: "https://www.petrostar.it/",
        logoUrl: petrostar_logo
    }
]