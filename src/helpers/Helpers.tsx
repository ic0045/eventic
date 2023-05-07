import dayjs, { Dayjs } from "dayjs";

export const juntarDataHorario = (data: Dayjs, horario: Dayjs): Dayjs => {
    return dayjs(new Date(data.year(), data.month(), data.date(), horario.hour(), horario.minute()));
}