import dayjs, { Dayjs } from "dayjs";

export const juntarDataHorario = (data: Dayjs, horario: Dayjs): Dayjs => {
    return dayjs(new Date(data.year(), data.month(), data.date(), horario.hour(), horario.minute()));
}

export const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error);
        }

    });
}

export const Regex = {
    email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    cpf:/^(\d{3}){2}\d{3}\d{2}$/,
    celular:/^[0-9\b]+$/,
    url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
}