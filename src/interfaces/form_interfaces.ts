export interface FormFieldState { 
    value?: string; 
    validators?: any[]; 
    valid?: boolean; 
    errorMessage?: string 
}

export interface ValidatorResponse {
    isValid: boolean;
    errorMessage: string;
}