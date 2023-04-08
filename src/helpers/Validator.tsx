export class Validator {
  static required(value: string, errorMessageToBeShown?: string) {
    return {
      isValid: value && value.trim().length > 0,
      errorMessage: errorMessageToBeShown ?? "Preencha esse campo",
    };
  }

  static email(mail: string, errorMessageToBeShown?: string) {
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
