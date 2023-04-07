export interface FormFieldState { 
    value?: string; 
    validators?: Function[]; 
    valid?: boolean; 
    errorMessage?: string 
}