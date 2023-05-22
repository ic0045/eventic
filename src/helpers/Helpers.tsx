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