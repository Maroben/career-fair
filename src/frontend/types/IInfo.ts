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
    links: Object
}
