import { ValidatorResponse } from "@/interfaces/form_interfaces";

export class Validator {
  static required(value: string, errorMessageToBeShown?: string): ValidatorResponse {
    return {
      isValid: value != null && value.trim().length > 0,
      errorMessage: errorMessageToBeShown ?? "Preencha esse campo",
    };
  }

  static email(mail: string, errorMessageToBeShown?: string): ValidatorResponse {
    let isValid = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      isValid = true
    }
    
    return {
        isValid: isValid,
        errorMessage: errorMessageToBeShown ?? "Preencha um e-mail válido",
    }
  }
}
