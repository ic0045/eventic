
export class Validator {

    static required(value: string, errorMessageToBeShown?: string){
        return { isValid: value && value.trim().length > 0, errorMessage: errorMessageToBeShown ?? 'Preencha esse campo' }
    }
}