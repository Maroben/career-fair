export type FormState = {
    data: { [name: string]: string | string[] | object }
    errors: { [name: string]: string | string[] | object }
    isSubmitable: boolean
}
