import { FormFieldState } from "@app/interfaces/form_interfaces";
import dayjs, { Dayjs } from "dayjs";


export class CustomForm{
    formState: Map<string, FormFieldState>;
    setFormState: any;

    constructor(formState: Map<string, FormFieldState>, setFormState: any){
        this.formState = formState;
        this.setFormState = setFormState;
    }


    addFormField(fieldId: string, validators: any[]){
        let formStateMap = new Map(this.formState);  
        // const currentValue = this.formState.get(fieldId);
        formStateMap.set(fieldId, {value: '', validators: validators, valid: true, errorMessage: '', })
    }

    validateForm = (): boolean => {
        let formStateMap = new Map(this.formState);  
        let isFormValid = true;
        this.formState.forEach((value: FormFieldState, key: string) => {
            let isFieldValid = true;
            let errorHelperText = '';
            value.validators?.forEach((validator) => {
                const validatorResponse: {
                    isValid: boolean;
                    errorMessage: string
                } = validator(value.value);

                if(!validatorResponse.isValid){
                    isFormValid = false;
                    isFieldValid = false;
                    errorHelperText = validatorResponse.errorMessage;
                }
            })
            const currentValue = this.formState.get(key);
            formStateMap.set(key, {...currentValue, valid: isFieldValid, errorMessage: errorHelperText})
            
        })

        this.setFormState(formStateMap)
        return isFormValid;
    }

    onInputChange = (e: any) => {
        const newValue = e.target?.value ?? e.$d;
        const currentValue = this.formState.get(e.target.id);
        let formStateMap = new Map(this.formState);
        formStateMap.set(e.target.id ?? e.target.name, {...currentValue, value: newValue})
        this.setFormState(formStateMap)
    }

    onDateInputChange = (data: Dayjs | null, id: string) => {
        const currentValue = this.formState.get(id);
        console.log(currentValue?.value);
        let formStateMap = new Map(this.formState);
        const year = data?.year() ?? 0;
        const month = data?.month() ?? 0;
        const day = data?.day() ?? 0;
        const hour = data?.hour() ?? 0;
        const minute = data?.minute() ?? 0;
        const newDate =  data?.isValid() ? dayjs(new Date(year, month, day, hour, minute)) : currentValue?.value as dayjs.Dayjs;
        formStateMap.set(id, {...currentValue, value: newDate})
        this.setFormState(formStateMap)
    }

    getValue = (fieldId: string): string | dayjs.Dayjs => {
        return this.formState.get(fieldId)?.value ?? ""
    }

    getErrorMessage = (fieldId: string): string => {
        return this.formState.get(fieldId)?.errorMessage ?? ""
    } 

    isValid = (fieldId: string): boolean => {
        return this.formState.get(fieldId)?.valid ?? false;
    }
}