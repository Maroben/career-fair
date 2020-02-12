export type FormState = {
    data: { [name: string]: string }
    errors: { [name: string]: string }
    isSubmitable: boolean
}
