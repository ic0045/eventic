import dayjs, { Dayjs } from "dayjs";

export class Validator {
  static required(value: string | dayjs.Dayjs, errorMessageToBeShown?: string): ValidatorResponse {
    let isValid = true;

    if(value == null) { isValid = false }

    if(typeof(value) == "string") {
      if(!((value as string).trim().length > 0)){
        isValid = false;
      }
     }

    return {
      isValid: isValid,
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

  static date(data: Dayjs, errorMessageToBeShown?: string): ValidatorResponse{
    return {
      isValid: data.isValid(),
      errorMessage: errorMessageToBeShown ?? "Preencha uma data válida",
    }
  }

  static equal(valorA: string): (valorB: string) => ValidatorResponse {
    console.log(`valorA`, valorA);
    return (valorB: string) => {
      console.log(`valorB`, valorA);
      console.log(`valorB`, valorB);
      return {
        isValid: valorA === valorB,
        errorMessage: "Os valores precisam ser iguais"
      }
    }

  }
}
