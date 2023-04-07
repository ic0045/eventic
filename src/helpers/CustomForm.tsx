import { FormFieldState } from "@/interfaces/form_interfaces";


export class CustomForm{
    formState: Map<string, FormFieldState>;
    setFormState: any;

    constructor(formState: Map<string, FormFieldState>, setFormState: any){
        this.formState = formState;
        this.setFormState = setFormState;
    }

    addFormField(fieldId: string, validators: any[]){
        let formStateMap = new Map(this.formState);  
        const currentValue = this.formState.get(fieldId);
        formStateMap.set(fieldId, {value: '', validators: validators, valid: true, errorMessage: '', })
    }

    validateForm = () => {
        let formStateMap = new Map(this.formState);  
        this.formState.forEach((value: FormFieldState, key: string) => {
            let isValid = true;
            let errorHelperText = '';
            value.validators?.forEach((validator) => {
                const validatorResponse: {
                    isValid: boolean;
                    errorMessage: string
                } = validator(value.value);

                if(!validatorResponse.isValid){
                    isValid = false;
                    errorHelperText = validatorResponse.errorMessage;
                }
            })
            const currentValue = this.formState.get(key);
            formStateMap.set(key, {...currentValue, valid: isValid, errorMessage: errorHelperText})
            
        })

        this.setFormState(formStateMap)
    }

    onInputChange = (e: any) => {
        const newValue = e.target.value;
        const currentValue = this.formState.get(e.target.id);
        let formStateMap = new Map(this.formState);
        formStateMap.set(e.target.id, {...currentValue, value: newValue})
        this.setFormState(formStateMap)
    }
}