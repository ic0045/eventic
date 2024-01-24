import moment from 'moment'
import 'moment/locale/pt-br';
import { EventoPorCategoriaRecomendacao, EventoPorPeriodoRecomendacao, EventoRecomendacao } from '../../app';


interface Categoria {
    id: string
    nome: string
    icone: string
}

interface ObjetoCategoria {
    eventosPorDiaAnteriores: Array<EventoPorPeriodoRecomendacao>
    eventosPorDiaNovos: Array<EventoPorPeriodoRecomendacao>
    eventosPorSemanaAnteriores: Array<EventoPorPeriodoRecomendacao>
    eventosPorSemanaNovos: Array<EventoPorPeriodoRecomendacao>
    eventosPorMesAnteriores: Array<EventoPorPeriodoRecomendacao>
    eventosPorMesNovos: Array<EventoPorPeriodoRecomendacao>
}

interface ListaCategorias {
    [key: string]: ObjetoCategoria;
}



function separaEventosPorPeriodo(eventos: EventoRecomendacao[], periodo: 'semana' | 'mes') {
    moment.locale('pt-br');
    const eventosPorPeriodo: Array<EventoPorPeriodoRecomendacao> = [];

    eventos.forEach((evento) => {
        let periodoIndex: number;
        let nomePeriodo: string;

        if (periodo === 'semana') {
            // periodoIndex = moment(evento.dataInicial).week();
            const dataInicioSemana = moment(evento.evento.dataInicial).startOf('week').format('D [de] MMMM');
            const dataFimSemana = moment(evento.evento.dataInicial).add(6, 'days').format('D [de] MMMM');
            nomePeriodo = `Semana de ${dataInicioSemana} a ${dataFimSemana}`;
        } else if (periodo === 'mes') {
            // periodoIndex = moment(evento.dataInicial).month();
            nomePeriodo = moment(evento.evento.dataInicial).format('MMMM YYYY');
        } else {
            throw new Error('Período inválido. Escolha entre "semana" e "mes".');
        }

        if (!eventosPorPeriodo.find((p) => p.nome === nomePeriodo)) {
            eventosPorPeriodo.push({
              nome: nomePeriodo,
              eventos: [],
            });
          }
      
          const periodoObj = eventosPorPeriodo.find((p) => p.nome === nomePeriodo);
          if (periodoObj) {
            periodoObj.eventos.push(evento);
          }

        // if (!eventosPorPeriodo[periodoIndex]) {
        //     eventosPorPeriodo[periodoIndex] = {
        //         nome: nomePeriodo,
        //         eventos: [],
        //     };
        // }
        // eventosPorPeriodo[periodoIndex].eventos.push(evento);
    });

    return eventosPorPeriodo;
}


function organizaEventos(eventos: EventoRecomendacao[]) {

    // Ordena os eventos por data
    eventos = eventos.sort((a :EventoRecomendacao , b : EventoRecomendacao) =>
        new Date(a.evento.dataInicial).getTime() -
        new Date(b.evento.dataInicial).getTime()
    );  
    // Separando os eventos em dois arrays: um para as datas que já passaram e outro para as novas datas
    const eventosAntigos: EventoRecomendacao[] = eventos.filter(evento => new Date(evento.evento.dataInicial).getTime() < Date.now());
    const eventosNovos: EventoRecomendacao[] = eventos.filter(evento => new Date(evento.evento.dataInicial).getTime() >= Date.now());

    let eventosPorDiaAnteriores = [{ nome: '', eventos: [...eventosAntigos] }]
    let eventosPorDiaNovos = [{ nome: '', eventos: [...eventosNovos] }]

    let eventosPorSemanaAnteriores = separaEventosPorPeriodo(eventosAntigos, 'semana');
    let eventosPorSemanaNovos = separaEventosPorPeriodo(eventosNovos, 'semana');

    let eventosPorMesAnteriores = separaEventosPorPeriodo(eventosAntigos, 'mes');
    let eventosPorMesNovos = separaEventosPorPeriodo(eventosNovos, 'mes');

    return [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos]
}


export function criaListaCategorias(eventosCategoria: Array<EventoPorCategoriaRecomendacao>, data: EventoRecomendacao[]) {

    const eventosOrganizados = organizaEventos(data)
    let [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = eventosOrganizados

    const listaCategorias: ListaCategorias = {
        Todas: {
            eventosPorDiaAnteriores: eventosPorDiaAnteriores,
            eventosPorDiaNovos: eventosPorDiaNovos,
            eventosPorSemanaAnteriores: eventosPorSemanaAnteriores,
            eventosPorSemanaNovos: eventosPorSemanaNovos,
            eventosPorMesAnteriores: eventosPorMesAnteriores,
            eventosPorMesNovos: eventosPorMesNovos
        }
    }

    for (const categoria of eventosCategoria) {
        const [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = organizaEventos(categoria.eventos)
        const eventoOrganizado = {
            eventosPorDiaAnteriores: eventosPorDiaAnteriores,
            eventosPorDiaNovos: eventosPorDiaNovos,
            eventosPorSemanaAnteriores: eventosPorSemanaAnteriores,
            eventosPorSemanaNovos: eventosPorSemanaNovos,
            eventosPorMesAnteriores: eventosPorMesAnteriores,
            eventosPorMesNovos: eventosPorMesNovos
        }
        listaCategorias[categoria.nome] = eventoOrganizado
    }

    return listaCategorias
}