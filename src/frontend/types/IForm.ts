export type FormState = {
    data: { [name: string]: string | string[] }
    errors: { [name: string]: string | string[] }
    isSubmitable: boolean
}
