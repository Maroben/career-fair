export const info = {
    filterLabels: ["subjects", "employmentTypes"],
    subjects: {
        label: "Studiengänge",
        items: [
            "Informatik",
            "Raumplanung",
            "Elektrotechnik",
            "Bauingenieurwesen",
            "Landschaftsarchitektur",
            "Wirtschaftsingenieurwesen",
            "Ernerbare Energien & Umwelttechnik"
        ]
    },
    employmentTypes: {
        label: "Anstellungsarten",
        items: ["Vollzeit", "Praktikum", "Training", "Teilzeit"]
    },
    links: {
        labels: ["Homepage", "LinkedIn", "Xing", "Facebook", "Instagram", "Twitter", "Youtube"],
        items: ["homepage", "linkedin", "xing", "facebook", "instagram", "twitter", "youtube"]
    }
}

export default interface IInfo {
    filterLabels: string[]
    subjects: {
        label: string
        items: string[]
    }
    employmentTypes: {
        label: string
        items: string[]
    }
    links: { [name: string]: string[] }
}
