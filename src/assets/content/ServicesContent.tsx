// Images
import casing_and_tubing from '/images/services/1_casing_and_tubing.webp'
import spare_parts from '/images/services/2_spare_parts.webp'
import transportation from '/images/services/3_transportation.webp'
import heavy_equip from '/images/services/4_heavy_equip.webp'
import labours_and_engineers from '/images/services/5_labours_and_engineers.webp'

export interface ServicesContentInterface {
    order: number;
    title: string;
    description: string;
    imageUrl: string;
}

export const servicesContents:ServicesContentInterface[] = [
    {
        order: 1,
        title: "Casing and Tubing",
        description: "Casing & Tube are used initially to line the drilled hole and prevent the well from collapsing, ensuring the integrity of the wellbore.",
        imageUrl: casing_and_tubing
    },
    {
        order: 2,
        title: "Spare parts for drilling",
        description: "Spare Parts for Drilling such as drill bits, motors, and mud pumps are essential for maintaining and repairing drilling equipment, ensuring continuous and effective drilling operations.",
        imageUrl: spare_parts
    },
    {
        order: 3,
        title: "Transportation",
        description: "Once the oil is ready for transport, pipelines and tankers move it to refineries.",
        imageUrl: transportation
    },
    {
        order: 4,
        title: "Heavy & Light Equipment",
        description: " Equipment like cranes, bulldozers, and forklifts support construction, drilling, & transportation tasks.",
        imageUrl: heavy_equip
    },
    {
        order: 5,
        title: "Labours & Engineers",
        description: "Manpower is critical, with specialists like geologists,engineers, and technicians overseeing and managing the technical aspects to ensure smooth operation of equipment and processes throughout the oil extraction project.",
        imageUrl: labours_and_engineers
    }
] 