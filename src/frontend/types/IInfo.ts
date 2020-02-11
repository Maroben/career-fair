export default interface Info {
    filterLabels: string[]
    subjects: {
        label: string
        items: string[]
    }
    employmentTypes: {
        label: string
        items: string[]
    }
    links: Object
}
