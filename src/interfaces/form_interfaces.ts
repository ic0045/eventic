import dayjs from 'dayjs';
export interface FormFieldState { 
    value?: string | dayjs.Dayjs; 
    validators?: any[]; 
    valid?: boolean; 
    errorMessage?: string 
}

export interface ValidatorResponse {
    isValid: boolean;
    errorMessage: string;
}